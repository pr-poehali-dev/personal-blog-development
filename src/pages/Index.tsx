import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import CommentsSection from '@/components/CommentsSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);

  const articles = [
    {
      id: 1,
      title: 'Минимализм в дизайне: меньше значит больше',
      excerpt: 'Исследование принципов минималистичного подхода к созданию интерфейсов и веб-дизайну.',
      date: '15 октября 2024',
      tags: ['дизайн', 'UX/UI', 'минимализм'],
      comments: 12
    },
    {
      id: 2,
      title: 'Типографика и читабельность',
      excerpt: 'Как выбор шрифтов влияет на восприятие контента и удержание внимания читателя.',
      date: '8 октября 2024',
      tags: ['типографика', 'веб-дизайн'],
      comments: 8
    },
    {
      id: 3,
      title: 'Пространство как инструмент дизайна',
      excerpt: 'Почему negative space — это не пустота, а важный элемент композиции.',
      date: '1 октября 2024',
      tags: ['дизайн', 'композиция'],
      comments: 15
    }
  ];

  const projects = [
    {
      id: 1,
      title: 'Редизайн корпоративного сайта',
      description: 'Современный подход к B2B коммуникации',
      image: '🎨'
    },
    {
      id: 2,
      title: 'Мобильное приложение для фитнеса',
      description: 'UX-исследование и прототипирование',
      image: '📱'
    },
    {
      id: 3,
      title: 'Система дизайна для стартапа',
      description: 'Создание единого языка продукта',
      image: '🎯'
    }
  ];

  const scrollToSection = (section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Личный блог</h1>
            <div className="flex gap-8">
              {['home', 'articles', 'about', 'portfolio', 'projects', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'articles' && 'Статьи'}
                  {section === 'about' && 'Обо мне'}
                  {section === 'portfolio' && 'Портфолио'}
                  {section === 'projects' && 'Проекты'}
                  {section === 'contact' && 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-6xl font-bold mb-6 tracking-tight">
            Дизайн, идеи и вдохновение
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Исследую минимализм, типографику и пространство. Делюсь мыслями о дизайне и разработке.
          </p>
        </div>
      </section>

      <section id="articles" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 tracking-tight">Статьи</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <Card 
                key={article.id} 
                className="hover:shadow-lg transition-all duration-300 animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedArticleId(article.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 leading-tight">{article.title}</h4>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{article.date}</span>
                    <div className="flex items-center gap-1">
                      <Icon name="MessageCircle" size={16} />
                      <span>{article.comments}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-8 tracking-tight">Обо мне</h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Привет! Я дизайнер и разработчик с фокусом на минималистичные решения. 
              Верю, что лучший дизайн — это тот, который незаметен, но делает жизнь проще.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Работаю с брендами и стартапами, помогая создавать продукты, которые люди любят использовать. 
              В свободное время изучаю типографику и экспериментирую с новыми технологиями.
            </p>
            <div className="flex gap-4 mt-8">
              <Button variant="outline" size="lg">
                <Icon name="Github" size={20} className="mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Linkedin" size={20} className="mr-2" />
                LinkedIn
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Twitter" size={20} className="mr-2" />
                Twitter
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold mb-12 tracking-tight">Портфолио</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card 
                key={project.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-6xl">
                  {project.image}
                </div>
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-2">{project.title}</h4>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-4xl font-bold mb-8 tracking-tight">Проекты</h3>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Здесь собраны мои эксперименты, open-source проекты и исследования. 
            Каждый проект — это возможность изучить что-то новое и поделиться опытом с сообществом.
          </p>
          <div className="space-y-6">
            {[
              { name: 'Design System Kit', desc: 'Библиотека компонентов для быстрого прототипирования', tech: 'React, TypeScript' },
              { name: 'Minimal Portfolio', desc: 'Open-source шаблон для личного сайта', tech: 'Next.js, Tailwind' },
              { name: 'Typography Tools', desc: 'Набор инструментов для работы со шрифтами', tech: 'JavaScript, CSS' }
            ].map((proj, index) => (
              <Card key={index} className="hover:border-primary transition-colors duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xl font-semibold mb-2">{proj.name}</h4>
                      <p className="text-muted-foreground mb-2">{proj.desc}</p>
                      <p className="text-sm text-primary">{proj.tech}</p>
                    </div>
                    <Icon name="ExternalLink" size={20} className="text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-6 bg-secondary/30">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-4xl font-bold mb-8 tracking-tight text-center">Контакты</h3>
          <Card>
            <CardContent className="p-8">
              <p className="text-muted-foreground mb-6 text-center">
                Есть идея для проекта или просто хотите поздороваться? Напишите мне!
              </p>
              <form className="space-y-4">
                <div>
                  <Input placeholder="Ваше имя" className="w-full" />
                </div>
                <div>
                  <Input type="email" placeholder="Email" className="w-full" />
                </div>
                <div>
                  <Textarea placeholder="Сообщение" rows={5} className="w-full" />
                </div>
                <Button className="w-full" size="lg">
                  <Icon name="Send" size={20} className="mr-2" />
                  Отправить
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>© 2024 Личный блог. Все права защищены.</p>
        </div>
      </footer>

      {selectedArticleId && (
        <CommentsSection
          articleId={selectedArticleId}
          onClose={() => setSelectedArticleId(null)}
        />
      )}
    </div>
  );
};

export default Index;