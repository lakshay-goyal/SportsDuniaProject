import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ChevronRight } from "lucide-react";
import { InfiniteMovingCardsDemo } from "../components/InfiniteMovingCardsDemo";
import { AnimatedModalDemo } from "../components/AnimatedModalDemo";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 sm:py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] dark:bg-grid-slate-400/[0.05] bg-[size:40px_40px]" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 sm:mb-6">
              Welcome to Sports Duniya
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto">
              Revolutionize your content management and payouts with our
              comprehensive dashboard.
            </p>
            <div className="space-x-2 space-y-5 mx-auto sm:space-x-4 flex flex-col sm:flex-row justify-center items-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-primary/80 text-black hover:from-primary/70 hover:to-primary/60 dark:bg-gradient-to-r dark:text-white dark:from-blue-500 dark:to-blue-700 dark:hover:from-blue-600 dark:hover:to-blue-800 rounded-full px-8 py-3 sm:py-4 shadow-lg sm:shadow-xl hover:shadow-2xl hover:scale-105 transition-all ease-in-out duration-300"
              >
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 sm:space-x-3"
                >
                  <span className="text-base sm:text-lg font-semibold">Sign In</span>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-gray-300 hover:bg-gradient-to-r hover:from-gray-600 hover:to-gray-700 dark:text-white dark:hover:from-gray-500 dark:hover:to-gray-600 border border-gray-600 rounded-full px-8 py-3 sm:py-4 shadow-lg sm:shadow-xl hover:shadow-2xl hover:scale-105 transition-all ease-in-out duration-300"
              >
                <Link
                  to="/signup"
                  className="flex items-center justify-center space-x-2 sm:space-x-3"
                >
                  <span className="text-base sm:text-lg font-semibold">Create Account</span>
                  <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
            Powerful Features for Content Creators
          </h2>
          <InfiniteMovingCardsDemo />
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-10 sm:py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-gray-900 dark:text-white">
            About Us
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8"
              >
                I'm Lakshay Goyal, a K.R. Mangalam University BCA student
                passionate about innovation and technology. My expertise lies in
                web and app development, leveraging DevOps techniques and APIs
                to create seamless user experiences. I thrive on challenging
                problems and am driven by a continuous learning mindset.
              </motion.p>
              <AnimatedModalDemo />
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="https://res.cloudinary.com/dkiktv5ur/image/upload/v1735747062/Lakshay_p2ph2g.jpg"
                alt="About Us"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-20 bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl sm:text-3xl font-bold text-white mb-4"
          >
            Ready to Transform Your Content Management?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-xl text-purple-100 mb-6 sm:mb-8"
          >
            Join thousands of content creators who have already revolutionized
            their workflow.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-secondary text-white hover:bg-secondary/80 dark:bg-secondary dark:hover:bg-secondary/80"
            >
              <Link to="/signup">Get Started for Free</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;
