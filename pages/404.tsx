import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";
import React from "react";

interface notFoundProps {}

const NotFound: React.FC<notFoundProps> = ({}) => {
  return (
    <>
      <Head>
        <title>404 Page</title>
      </Head>
      <div className="flex-center h-screen bg-white-custom">
        <div className="text-center">
          {/* <div className="text-4xl my-4">Sorry, Page doesn&rsquo;t exist</div> */}
          <p className="text-4xl my-5">Page Not Found</p>
          <hr className="my-5" />
          <Link href={"/"}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="goBack cursor-pointer"
            >
              Go back to Home
            </motion.div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default NotFound;
