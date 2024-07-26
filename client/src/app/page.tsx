import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Combine, Pencil, Save } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex min-h-[100dvh] flex-col'>
      <header className='bg-gradient-to-b from-pink-200 from-30% to-sky-100 py-12 md:py-20 lg:py-24'>
        <div className='container mx-auto px-4 md:px-6 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:gap-16'>
            <div className='flex flex-col items-start justify-center space-y-6'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl lg:text-6xl'>
                Collaborative Drawing Board
              </h1>
              <p className='text-lg  md:text-xl'>
                Bring your ideas to life with our powerful drawing board.
                Collaborate in real-time, access a wide range of tools, and save
                your creations.
              </p>
              <Link
                href={'/api/auth/login'}
                className='inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
              >
                Try the App
              </Link>
            </div>
            <div className='flex justify-center rounded-xl'>
              <img
                src='/hero-2.png'
                width='600'
                height='400'
                alt='Hero Image'
                className='rounded-lg object-cover '
              />
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className='bg-gradient-to-b from-sky-100 to-blue-50 py-12 md:py-20 lg:py-24'>
          <div className='container mx-auto px-4 md:px-6 lg:px-8'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col items-start space-y-4'>
                <Pencil className='h-8 w-8 text-sky-600' />
                <h3 className='text-xl font-bold'>Powerful Drawing Tools</h3>
                <p className='text-muted-foreground'>
                  Access a wide range of drawing tools, from basic pencils to
                  advanced brushes, to bring your ideas to life.
                </p>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <Combine className='h-8 w-8 text-sky-600' />
                <h3 className='text-xl font-bold'>Real-Time Collaboration</h3>
                <p className='text-muted-foreground'>
                  Invite your team to collaborate on the same drawing in
                  real-time, making it easy to brainstorm and iterate.
                </p>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <Save className='h-8 w-8 text-sky-600' />
                <h3 className='text-xl font-bold'>Save and Export</h3>
                <p className='text-muted-foreground'>
                  Save your drawings and export them in various formats, so you
                  can share your creations with others.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='bg-gradient-to-b from-sky-50 to-white py-12 md:py-20 lg:py-24'>
          <div className='container mx-auto px-4 md:px-6 lg:px-8'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
              <div className='flex flex-col items-start space-y-4'>
                <blockquote className='flex flex-col items-start space-y-4'>
                  <p className='text-lg font-medium text-foreground'>
                    "The collaborative drawing board has been a game-changer for
                    our team. It's easy to use and has helped us brainstorm and
                    iterate on ideas much more effectively."
                  </p>
                  <div className='flex items-center space-x-4'>
                    <Avatar>
                      <AvatarImage src='/placeholder-user.jpg' />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium'>John Doe</p>
                      <p className='text-sm text-muted-foreground'>Designer</p>
                    </div>
                  </div>
                </blockquote>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <blockquote className='flex flex-col items-start space-y-4'>
                  <p className='text-lg font-medium text-foreground'>
                    "I've tried a lot of drawing tools, but this one is by far
                    the best. The real-time collaboration and wide range of
                    features make it a must-have for any creative team."
                  </p>
                  <div className='flex items-center space-x-4'>
                    <Avatar>
                      <AvatarImage src='/placeholder-user.jpg' />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium'>Jane Smith</p>
                      <p className='text-sm text-muted-foreground'>
                        Art Director
                      </p>
                    </div>
                  </div>
                </blockquote>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <blockquote className='flex flex-col items-start space-y-4'>
                  <p className='text-lg font-medium text-foreground'>
                    "I'm amazed by how easy it is to use this drawing board. The
                    intuitive interface and powerful features have made our
                    brainstorming sessions much more productive."
                  </p>
                  <div className='flex items-center space-x-4'>
                    <Avatar>
                      <AvatarImage src='/placeholder-user.jpg' />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className='text-sm font-medium'>Michael Johnson</p>
                      <p className='text-sm text-muted-foreground'>
                        Product Manager
                      </p>
                    </div>
                  </div>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='bg-white py-6 md:py-8 lg:py-10'>
        <div className='container mx-auto px-4 md:px-6 lg:px-8'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <div className='flex items-center space-x-4'>
              <Link
                href='#'
                className='text-sm  hover:underline'
                prefetch={false}
              >
                About
              </Link>
              <Link
                href='#'
                className='text-sm  hover:underline'
                prefetch={false}
              >
                Terms of Service
              </Link>
              <Link
                href='#'
                className='text-sm  hover:underline'
                prefetch={false}
              >
                Contact
              </Link>
            </div>
            <p className='text-sm '>
              &copy; 2024 Draw. Created By{' '}
              <a
                target='_blank'
                className='underline underline-offset-2'
                rel='noopener noreferrer'
                href={'https://github.com/Kunwar-Aditya-Codes'}
              >
                Kunwar Aditya.
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
