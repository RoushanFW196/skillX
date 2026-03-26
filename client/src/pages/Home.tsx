import { ArrowRight, Zap, Users, Sparkles, CheckCircle2, Lightbulb, Globe, Handshake } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export function Home() {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Learn Anything',
      description: 'Access diverse skills from a global community of experts and enthusiasts.',
    },
    {
      icon: <Handshake className="w-8 h-8" />,
      title: 'Fair Exchange',
      description: 'Share your knowledge and get what you need without spending money.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real Connections',
      description: 'Build meaningful relationships through shared learning experiences.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Community',
      description: 'Connect with learners and teachers from around the world.',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Grow Your Skills',
      description: 'Master new abilities while sharing your expertise with others.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Safe Platform',
      description: 'Vetted community members and secure interactions for peace of mind.',
    },
  ];

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-40 left-20 w-72 h-72 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-secondary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-8 px-4 py-2 bg-primary-50 rounded-full">
            <Zap className="w-4 h-4 text-primary-600" />
            <span className="text-sm font-semibold text-primary-700">Welcome to SkillSwap</span>
          </div>

          <h1 className="text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
            Exchange Skills,
            <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Build Impact</span>
          </h1>

          <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            A platform where knowledge flows freely. Learn anything from anyone. Teach what you know. No money, just mutual growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold">
              Start Learning Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-300 text-neutral-900 hover:bg-neutral-50 font-semibold">
              Explore Skills
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">Why Join SkillSwap?</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Everything you need to learn, teach, and grow together with a supportive community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index} hover className="group">
                <div className="text-primary-600 mb-4 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{feature.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>



      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
                How It Works
              </h2>
              <p className="text-lg text-neutral-600 mb-8 leading-relaxed">
                Getting started is simple. Create your profile, showcase your skills, find what you want to learn, and connect with the community.
              </p>

              <div className="space-y-5">
                {[
                  { num: '1', title: 'Create Profile', desc: 'Set up your account and highlight your skills' },
                  { num: '2', title: 'Browse Skills', desc: 'Discover what others can teach you' },
                  { num: '3', title: 'Connect & Learn', desc: 'Match with mentors and start exchanging' },
                  { num: '4', title: 'Grow Together', desc: 'Share knowledge and expand your abilities' },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 text-primary-600 font-semibold flex items-center justify-center">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">{step.title}</h3>
                      <p className="text-neutral-600 text-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 rounded-2xl overflow-hidden shadow-xl h-96 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative text-center text-white">
                  <Sparkles className="w-24 h-24 mx-auto mb-4 opacity-80" />
                  <p className="text-2xl font-bold">Join 10K+ Learners</p>
                  <p className="text-white/80 mt-2">Already exchanging skills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">Ready to Start?</h2>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Join our community and start exchanging skills with learners and teachers worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700 text-white font-semibold">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-neutral-600 text-white hover:bg-white/10 font-semibold">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-primary-600 mb-2">10K+</p>
              <p className="text-neutral-600">Active Learners</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent-600 mb-2">50+</p>
              <p className="text-neutral-600">Skill Categories</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-secondary-600 mb-2">150+</p>
              <p className="text-neutral-600">Countries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
