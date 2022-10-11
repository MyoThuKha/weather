const Forecast = () => {
  return (
    <div className="px-10 py-8 min-h-screen">
      <section style={{ minHeight: "25vh" }}>
        <input placeholder="City" className=" bg-white" />
      </section>
      <section style={{ minHeight: "30vh" }} className="flex items-center">
        {/* <div className=" w-52 h-52 bg-purple-600"></div> */}
        <div>
          <p className="text-8xl">
            12°<sup>c</sup>
          </p>
          <p className="text-lg">
            Monday, <span className=" text-gray-400">16:00</span>
          </p>
        </div>
      </section>
      <hr />
      <section style={{ minHeight: "32vh" }}>
        <div>
          <p className="text-sm">Mostly Cloudy</p>
          <p className="text-sm">Rain - 30%</p>
          <div className="h-32 rounded-3xl text-white flex-center drop-shadow-2xl background">
            New York
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forecast;
