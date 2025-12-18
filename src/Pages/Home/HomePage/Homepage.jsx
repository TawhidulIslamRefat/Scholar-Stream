import { motion as Motion } from 'framer-motion';
import Hero from '../Hero/Hero';
import Testimonial from '../SuccessStroy/SuccessStory';
import FAQ from '../FAQ/FAQ';
import NewsletterSection from '../Newsletter/Newsletter';
import TopScholarships from '../TopScholarships/TopScholarships';
import EducationHero from '../EducationHero/EducationHero';

const Homepage = () => {
  // Animation variants for sections
  const sectionVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <Motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Hero />
      </Motion.section>

      <Motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <EducationHero />
      </Motion.section>

      <Motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <TopScholarships />
      </Motion.section>

      <Motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <Testimonial />
      </Motion.section>

      <Motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <FAQ />
      </Motion.section>

      <Motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <NewsletterSection />
      </Motion.section>
    </Motion.div>
  );
};

export default Homepage;