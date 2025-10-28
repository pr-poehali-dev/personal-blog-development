import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import funcUrls from '../../backend/func2url.json';

interface Comment {
  id: number;
  author_name: string;
  comment_text: string;
  created_at: string;
}

interface CommentsSectionProps {
  articleId: number;
  onClose: () => void;
}

const CommentsSection = ({ articleId, onClose }: CommentsSectionProps) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    comment_text: ''
  });
  const { toast } = useToast();

  const fetchComments = async () => {
    try {
      const response = await fetch(`${funcUrls.comments}?article_id=${articleId}`);
      const data = await response.json();
      setComments(data.comments || []);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось загрузить комментарии',
        variant: 'destructive'
      });
    }
  };

  useEffect(() => {
    fetchComments();
  }, [articleId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author_name || !formData.author_email || !formData.comment_text) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(funcUrls.comments, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          article_id: articleId,
          ...formData
        })
      });

      if (response.ok) {
        toast({
          title: 'Успешно!',
          description: 'Ваш комментарий добавлен'
        });
        setFormData({ author_name: '', author_email: '', comment_text: '' });
        fetchComments();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить комментарий',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto animate-scale-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Комментарии</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4 mb-8 pb-8 border-b">
            <Input
              placeholder="Ваше имя"
              value={formData.author_name}
              onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
            />
            <Input
              type="email"
              placeholder="Email"
              value={formData.author_email}
              onChange={(e) => setFormData({ ...formData, author_email: e.target.value })}
            />
            <Textarea
              placeholder="Ваш комментарий"
              rows={4}
              value={formData.comment_text}
              onChange={(e) => setFormData({ ...formData, comment_text: e.target.value })}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Отправка...' : 'Отправить комментарий'}
            </Button>
          </form>

          <div className="space-y-4">
            <h4 className="font-semibold text-lg">
              Комментарии ({comments.length})
            </h4>
            {comments.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                Пока нет комментариев. Будьте первым!
              </p>
            ) : (
              comments.map((comment) => (
                <Card key={comment.id} className="bg-secondary/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                        {comment.author_name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{comment.author_name}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                        <p className="text-sm leading-relaxed">{comment.comment_text}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommentsSection;
