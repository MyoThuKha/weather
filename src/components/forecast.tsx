const Forecast = () => {
  return (
    <div className="px-10 py-8">
      <input placeholder="City" className=" bg-white" />
      <div className=" w-52 h-52 bg-purple-600"></div>
      <div>
        <p className="text-8xl">
          12°<sup>c</sup>
        </p>
        <p className="text-lg">
          Monday, <span className=" text-gray-400">16:00</span>
        </p>
      </div>
      <hr />
      <section>
        <div>
          <p className="text-sm">Mostly Cloudy</p>
          <p className="text-sm">Rain - 30%</p>
        </div>
        <div className="h-32 rounded-3xl text-white flex-center background">
          New York
        </div>
      </section>
    </div>
  );
};

export default Forecast;
