const EmbedTest = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
      className="bg-black"
    >
      <iframe
        src="http://localhost:5173/xibo-calender" // pas aan naar je lokale route!
        style={{
          border: 0,
          width: "110%",
          height: "110%",
          transform: "scale(0.9)",
          transformOrigin: "top left",
        }}
        scrolling="no"
      ></iframe>
    </div>
  );
};

export default EmbedTest;
