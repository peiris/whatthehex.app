"use client";

const Footer = () => {
  return (
    <footer className="mt-auto py-8 text-center">
      <div className="container mx-auto">
        <span className="text-sm text-gray-500">
          Made with{" "}
          <i className="ri-heart-3-fill text-red-500"></i> for colors by{" "}
          <a
            href="https://twitter.com/khpeiris"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0d51ff] hover:underline"
          >
            Peiris
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
