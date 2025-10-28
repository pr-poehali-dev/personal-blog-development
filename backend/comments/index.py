import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление комментариями к статьям блога
    Args: event - dict с httpMethod, body, queryStringParameters
          context - object с attributes: request_id, function_name
    Returns: HTTP response dict с комментариями или статусом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Database configuration missing'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    
    if method == 'GET':
        params = event.get('queryStringParameters', {})
        article_id = params.get('article_id')
        
        if not article_id:
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'article_id is required'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute(
            "SELECT id, article_id, author_name, comment_text, created_at FROM comments WHERE article_id = %s AND is_approved = true ORDER BY created_at DESC" % (article_id,)
        )
        comments = cursor.fetchall()
        cursor.close()
        conn.close()
        
        comments_list = []
        for comment in comments:
            comments_list.append({
                'id': comment['id'],
                'article_id': comment['article_id'],
                'author_name': comment['author_name'],
                'comment_text': comment['comment_text'],
                'created_at': comment['created_at'].isoformat() if isinstance(comment['created_at'], datetime) else str(comment['created_at'])
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'comments': comments_list}),
            'isBase64Encoded': False
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        
        article_id = body_data.get('article_id')
        author_name = body_data.get('author_name', '').strip()
        author_email = body_data.get('author_email', '').strip()
        comment_text = body_data.get('comment_text', '').strip()
        
        if not all([article_id, author_name, author_email, comment_text]):
            conn.close()
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': 'All fields are required'}),
                'isBase64Encoded': False
            }
        
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO comments (article_id, author_name, author_email, comment_text) VALUES (%s, '%s', '%s', '%s')" % (
                article_id,
                author_name.replace("'", "''"),
                author_email.replace("'", "''"),
                comment_text.replace("'", "''")
            )
        )
        conn.commit()
        cursor.close()
        conn.close()
        
        return {
            'statusCode': 201,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'success': True,
                'message': 'Comment added successfully'
            }),
            'isBase64Encoded': False
        }
    
    conn.close()
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'}),
        'isBase64Encoded': False
    }
