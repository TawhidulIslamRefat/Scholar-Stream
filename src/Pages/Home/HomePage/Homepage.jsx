import React from 'react';
import Hero from '../Hero/Hero';
import Testimonial from '../SuccessStroy/SuccessStory';
import FAQ from '../FAQ/FAQ';
import NewsletterSection from '../Newsletter/Newsletter';
import TopScholarships from '../TopScholarships/TopScholarships';
import EducationHero from '../EducationHero/EducationHero';

const Homepage = () => {
    return (
        <div>
          <section>
            <Hero></Hero>
          </section>
          <section>
           <EducationHero></EducationHero>
          </section>
          <section>
            <TopScholarships></TopScholarships>
          </section>
          <section>
            <Testimonial></Testimonial>
          </section>
          <section>
            <FAQ></FAQ>
          </section>
          <section>
            <NewsletterSection></NewsletterSection>
          </section>
        </div>
    );
};

export default Homepage;