import React, { useRef } from "react";

const CustomCursor = () => {
  // UPDATE: I was able to get this working again... Enjoy!

  var cursorinner = useRef();
  var a = document.querySelectorAll("a");

  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
  });

  document.addEventListener("mousemove", function (e) {
    var x = e.clientX;
    var y = e.clientY;
    if (!cursorinner.current) return;
    cursorinner.current.style.left = x + "px";
    cursorinner.current.style.top = y + "px";
  });

  const handleMouseEventForParent = (e) => {
    if (e.detail.mouseEnteredInChild === "true" && cursorinner.current) {
      cursorinner.current.style.display = "none";
    }
    if (e.detail.mouseEnteredInChild === "false" && cursorinner.current) {
      cursorinner.current.style.display = "block";
    }
  };
  //To Disable mouse when entred in iFrame
  document.addEventListener(
    "mouseEnteredInChild",
    handleMouseEventForParent,
    false
  );
  //end

  document.addEventListener("mousedown", function () {
    cursorinner.current &&
      cursorinner.current.classList.add("cursorinnerhover");
  });

  document.addEventListener("mouseup", function () {
    cursorinner.current &&
      cursorinner.current.classList.remove("cursorinnerhover");
  });

  a.forEach((item) => {
    item.addEventListener("mouseover", () => {});
    item.addEventListener("mouseleave", () => {});
  });

  return (
    <div style={{ zIndex: 9999 }}>
      <div className="cursor2" ref={cursorinner} style={{ zIndex: 9999 }}></div>
    </div>
  );
};

export default CustomCursor;
