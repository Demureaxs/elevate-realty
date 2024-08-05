import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { Raleway } from 'next/font/google';
import Button from '@/components/ui/Button';
import Carousel from '../components/homepage/Carousel';
import { GetStaticProps } from 'next';
import homepage from '../../public/homepage.json';

import {
  HomeModernIcon,
  BuildingLibraryIcon,
  WrenchIcon,
  BanknotesIcon,
} from '@heroicons/react/24/solid';

export const raleway = Raleway({ subsets: ['latin'] });

type Homepage = {
  metaTitle: string;
  metaDescription: string;
  companyName: string;
  heroSection: {
    h1: string;
    p: string;
    button: string;
    aside: string;
  };
  about: {
    whoWeAre: string;
    description: string;
    ourMission: string;
    description2: string;
    ourValues: string;
    values: string[];
    ourTeam: string;
    team: [
      {
        name: string;
        title: string;
        img: string;
      }
    ];
  };
  whatWeDo: {
    title: string;
    subtitle: string;
    processes: [
      {
        title: string;
        description: string;
      }
    ];
  };
  awards: {
    title: string;
    subtitle: string;
  };
  trackRecord: {
    title: string;
    description: string;
    projects: [
      {
        title: string;
        description: string;
        img: string;
        status: string;
      }
    ];
  };
  testimonials: {
    title: string;
    reviews: [
      {
        review: string;
        author: string;
        profession: string;
        rating: number;
      }
    ];
  };
  realEstateSyndication: {
    img: string;
    title: string;
    description: string[];
    benefits: string[];
    outword: string;
  };
};

const Home = ({ homepage }: { homepage: Homepage }) => {
  const {
    metaTitle,
    metaDescription,
    companyName,
    heroSection,
    about,
    whatWeDo,
    awards,
    trackRecord,
    testimonials,
    realEstateSyndication,
  } = homepage || {};

  const goldColor = 'text-[#f1e8af]/80';

  const iconsArray = [
    <div className='flex gap-32 justify-evenly'>
      <BanknotesIcon className='h-48 w-48' />
      <BuildingLibraryIcon className='h-48 w-48' />
      <HomeModernIcon className='h-48 w-48' />
    </div>,
    <div className='flex gap-32 justify-evenly'>
      <BanknotesIcon className='h-48 w-48' />
      <BuildingLibraryIcon className='h-48 w-48' />
      <HomeModernIcon className='h-48 w-48' />
    </div>,
    <div className='flex gap-32 justify-evenly'>
      <BanknotesIcon className='h-48 w-48' />
      <BuildingLibraryIcon className='h-48 w-48' />
      <HomeModernIcon className='h-48 w-48' />
    </div>,
  ];
  const reviewformatted: any = [];

  testimonials?.reviews.forEach((review, index) => {
    reviewformatted.push(
      <div
        key={index}
        className='flex justify-center items-center text-center flex-col gap-6'
      >
        <div className='space-x-6'>
          <aside className='tracking-widest text-2xl'>
            {'⭐ '.repeat(Math.floor(review.rating)) +
              (review.rating % 1 !== 0 ? ' ⭐ ' : '')}
          </aside>
        </div>
        <article className='text-2xl w-4/5'>{review.review}</article>
        <div>
          <h2 className='font-normal text-lg'>{review.author}</h2>
          <aside>{review.profession}</aside>
        </div>
      </div>
    );
  });

  return (
    <main
      className={`min-h-screen ${raleway.className} font-extralight bg-[#0a333c] text-gray-200`}
    >
      <Head>
        <title>{metaTitle}</title>
        <meta name='description' content={metaDescription} />
      </Head>

      {/* Header */}

      <header className='fixed bg-[#0a333c] flex justify-between items-center shadow-sm px-10 py-4 w-full z-10'>
        <div className='flex items-center gap-2 overflow-hidden h-16'>
          <Image
            className='object-cover'
            src='/elevateLogo.webp'
            alt='elevate logo'
            width={200}
            height={200}
          />
        </div>
        <div className='flex-1 flex items-center justify-end gap-32 '>
          <nav className='flex justify-between gap-6 text-nowrap text-sm font-normal'>
            <Link
              className='cursor-pointer z-20 hover:text-[#e4d391] transition-all duration-300 ease-in-out'
              href='/'
            >
              Home
            </Link>
            <Link
              className='cursor-pointer z-20 hover:text-[#e4d391] transition-all duration-300 ease-in-out'
              href='/'
            >
              What is Syndication
            </Link>
            <Link
              className='cursor-pointer z-20 hover:text-[#e4d391] transition-all duration-300 ease-in-out'
              href='/#about'
            >
              About
            </Link>
            <Link
              className='cursor-pointer z-20 hover:text-[#e4d391] transition-all duration-300 ease-in-out'
              href='/'
            >
              Resources
            </Link>
            <Link
              className='cursor-pointer z-20 hover:text-[#e4d391] transition-all duration-300 ease-in-out'
              href='/'
            >
              The MFIN Conference
            </Link>
            <Link
              className='cursor-pointer z-20 hover:text-[#e4d391] transition-all duration-300 ease-in-out'
              href='/'
            >
              Our Portfolio
            </Link>
            <Link
              className='cursor-pointer z-20 hover:text-[#e4d391] transition-all duration-300 ease-in-out'
              href='/'
            >
              Investors
            </Link>
          </nav>

          <Button
            link='/'
            styles='hover:bg-[#e4d391] hover:text-gray-800 transition-all duration-500 ease-in-out'
          >
            Become an Investor
          </Button>
        </div>
      </header>

      {/* Hero Section */}

      <section
        id='heroSection'
        className='relative h-screen overflow-hidden shadow-lg'
      >
        <img
          src='/originalImage.webp'
          alt='Buildings'
          className='absolute top-0 left-0 w-full object-cover'
          width={500}
          height={500}
        />
        <div className=' relative h-full  flex flex-col gap-12 justify-center items-start max-w-screen-xl mx-auto pb-16'>
          <h1 className='text-5xl font-normal uppercase w-1/2 tracking-wider'>
            {heroSection?.h1}
          </h1>
          <p className='w-1/2 font-light text-lg'>{heroSection?.p}</p>
          <Button
            link='/'
            styles='hover:bg-[#e4d391] hover:text-gray-800 transition-all duration-500'
          >
            {heroSection?.button}
          </Button>
          <aside className='w-1/2 font-light'>{heroSection?.aside}</aside>
        </div>
        <div className='absolute bottom-0 left-0 w-full bg-white text-black font-light flex justify-evenly py-12'>
          <div>
            <h2 className='text-3xl font-bold'>$800 M+</h2>
            <aside>Assets Under Management</aside>
          </div>
          <div>
            <h2 className='text-3xl font-bold'>5,000 +</h2>
            <aside>Properties Under Management</aside>
          </div>

          <div>
            <h2 className='text-3xl font-bold'>35 %+</h2>
            <aside>Average Annualized Return to Investors*</aside>
          </div>
          <Button
            link='/'
            styles={
              ' bg-[#0a333c] text-gray-200 z-[0.5] hover:bg-[#e4d391] hover:text-gray-800 transition-all duration-500'
            }
          >
            Invest with Us
          </Button>
        </div>
      </section>

      {/* About Section */}

      <section
        id='about'
        className='h-screen max-w-screen-xl mx-auto flex justify-between items-center gap-12'
      >
        <div className='w-1/2 flex flex-col gap-12 px-6'>
          <h2 className='text-5xl font-normal uppercase tracking-wider'>
            {about?.whoWeAre}
          </h2>
          <p>{about?.description}</p>
          <h3 className='text-4xl font-normal uppercase tracking-wider'>
            {about?.ourMission}
          </h3>
          <p>{about?.description2}</p>
          <h4 className='text-3xl font-normal uppercase tracking-wider'>
            {about?.ourValues}
          </h4>
          <ul className='list-disc pl-4 space-y-2'>
            {about?.values &&
              about?.values.map((item, index) => {
                return (
                  <li key={index} className=''>
                    {item}
                  </li>
                );
              })}
          </ul>
        </div>
        <div className='w-1/2 '>
          <div className='w-full flex justify-center pb-6'>
            <h2 className='text-4xl font-normal uppercase tracking-wider pt-16 '>
              {about?.ourTeam}
            </h2>
          </div>
          <div className='grid grid-cols-2 grid-rows-2 gap-2'>
            {about?.team &&
              about?.team.map((member, index) => {
                return (
                  <article
                    key={index}
                    className='flex flex-col justify-center items-center gap-4'
                  >
                    <Image
                      src={member.img}
                      alt={member.name}
                      height={500}
                      width={500}
                      className='h-2/3 w-2/3 object-cover rounded-md self-center'
                    />
                    <div>
                      <h1 className='text-center font-normal'>{member.name}</h1>
                      <aside className='text-center font-semibold'>
                        {member.title}
                      </aside>
                    </div>
                  </article>
                );
              })}
          </div>
        </div>
      </section>
      <section id='awards' className='bg-gray-200 text-gray-800'>
        <div className='w-full max-w-screen-xl mx-auto flex flex-col gap-6 items-center justify-center pb-6'>
          <h2 className='text-4xl font-semibold uppercase tracking-wider pt-16'>
            {awards?.title}
          </h2>
          <aside className='text-2xl -pb-16 font-normal tracking-wider'>
            {awards?.subtitle}
          </aside>

          <Carousel icons={iconsArray} />
        </div>
      </section>

      {/* What we do */}

      <section
        id='whatWeDo'
        className='h-screen min-h-screen flex flex-col justify-center items-center max-w-screen-xl mx-auto'
      >
        <div className='space-y-12 pb-12 w-2/3 mx-auto text-center'>
          <h1 className='text-5xl font-normal uppercase tracking-wider text-center'>
            {whatWeDo?.title}
          </h1>
          <p className='text-lg'>{whatWeDo?.subtitle}</p>
        </div>
        <div className='flex justify-evenly gap-24 w-full '>
          {whatWeDo?.processes.map((item, index) => {
            return (
              <article
                key={index}
                className='flex flex-col  flex-grow-0 items-center gap-6 w-2/3 text-center p-6 border border-transparent hover:border-gray-200 transition-all duration-500 ease-in-out  rounded-lg'
              >
                {index === 0 ? (
                  <BuildingLibraryIcon className='h-24 w-24' />
                ) : index === 1 ? (
                  <WrenchIcon className='h-24 w-24' />
                ) : (
                  <BanknotesIcon className='h-24 w-24' />
                )}
                <h2 className='text-2xl font-light uppercase tracking-wider text-center'>
                  {item.title}
                </h2>
                <p>{item.description}</p>
              </article>
            );
          })}
        </div>
        <Button
          link='/'
          styles='mt-8 hover:bg-[#e4d391] hover:text-gray-800 transition-all duration-500 ease-in-out'
        >
          Invest with Us
        </Button>
      </section>

      <div className='w-full border-[0.5px] border-gray-200/20'></div>

      {/* Track Record */}

      <section
        id='trackRecord'
        className='min-h-screen flex flex-col justify-center items-center'
      >
        <div className='flex flex-col gap-12 items-center justify-center'>
          <div className='flex flex-col gap-12 text-center'>
            <h1 className='text-5xl font-normal uppercase tracking-wider'>
              {trackRecord?.title}
            </h1>
            <p className='w-2/3 mx-auto text-lg'>{trackRecord?.description}</p>
          </div>
          <div className='grid grid-cols-4 gap-6 max-w-screen-2xl mx-auto'>
            {trackRecord?.projects &&
              trackRecord?.projects.map((project, index) => {
                return (
                  <div>
                    <img src={project.img} alt={project.description} />
                  </div>
                );
              })}
          </div>
        </div>
        <Button
          link='/'
          styles='mt-8 hover:bg-[#e4d391] hover:text-gray-800 transition-all duration-500 ease-in-out'
        >
          Our Portfolio
        </Button>
      </section>

      {/* Testimonials */}

      <section
        id='testimonials'
        className='h-[60vh] bg-gray-200 text-gray-800/80 flex flex-col justify-center items-center'
      >
        <div className='text-5xl font-normal uppercase tracking-wider text-center'>
          <h1>{testimonials?.title}</h1>
        </div>

        <Carousel icons={reviewformatted} />
      </section>

      {/* What is Real Estate Syndication */}
      
      <section className='min-h-screen'>
        <div className='flex gap-10'>
          <div className='flex-1 h-[100%] overflow-hidden'>
            <img
              src={realEstateSyndication?.img}
              alt='Skyscraper'
              className=' w-full object-cover'
            />
          </div>
          <div className='flex-1 flex flex-col justify-center items-center gap-10 p-32'>
            <h1 className='text-5xl font-normal uppercase tracking-wider pb-6'>
              {realEstateSyndication?.title}
            </h1>
            {realEstateSyndication?.description &&
              realEstateSyndication.description.map((paragraph, index) => {
                return <p key={index}>{paragraph}</p>;
              })}
            <ul className='pl-4 self-start'>
              {realEstateSyndication?.benefits &&
                realEstateSyndication.benefits.map((benefit, index) => {
                  return (
                    <li key={index} className='list-disc'>
                      {benefit}
                    </li>
                  );
                })}
            </ul>
            <p>{realEstateSyndication?.outword}</p>
            <Button
              link='/'
              styles='mt-8 hover:bg-[#e4d391] w-fit mx-auto hover:text-gray-800 transition-all duration-500 ease-in-out'
            >
              Invest With Us
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  // Fetch data from your API or CMS here

  return {
    props: {
      homepage,
    },
    // revalidate: 10, // Revalidate at most once every 10 seconds
  };
};
