export const Footer = () => {
  return (
    <footer>
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5">
            &copy; {new Date().getFullYear()} Created with ❤️ by Team Kraken
          </p>
        </div>
      </div>
    </footer>
  );
};
