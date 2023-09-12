import { useState } from "react";
import data from "./data/data.json";

function App() {
  // console.log(data);
  const [colorIndex, setColorIndex] = useState(0);
  // const color = data.products.map((e) => {
  //   return e.stock[colorIndex].colors;
  // });
  const color = data.products[0].stock[colorIndex].colors;
  const size = data.products.map((e) => {
    return e.stock;
  });
  // console.log(size);
  // console.log(color);
  return (
    <div className="App">
      {data.products.map((item, index) => (
        <div key={index}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <img
            style={{ width: "500px", height: "500px" }}
            src={`${item.gallery.main}`}
          />
          <div style={{ display: "flex" }}>
            <div>
              {Object.keys(item.specs).map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
            <div>
              {Object.values(item.specs).map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
          {item.gallery.images.map((item, index) => (
            <img
              style={{ width: "300px", height: "300px" }}
              src={item}
              key={index}
            />
          ))}
          <hr></hr>
          <hr></hr>
          <hr></hr>
          <hr></hr>
        </div>
      ))}

      {data.products[0].stock.map((e, i) => (
        <div key={i}>
          <button onClick={() => setColorIndex(i)}>{e.size}</button>
        </div>
      ))}

      {color.map((e, i) => (
        <div key={i}>
          <p>{Object.keys(e)[1]}</p>
          <img
            src={`${Object.values(e)[1]}`}
            key={i}
            style={
              Object.values(e)[0] <= 0
                ? {
                    width: "100px",
                    height: "100px",
                    border: "5px solid red",
                  }
                : { width: "100px", height: "100px" }
            }
          />
          <p>in stock: {e.numberOfItems}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
