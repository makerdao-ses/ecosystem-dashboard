/* eslint-disable quotes */
import React from "react";
import "./markdown.scss";

export const customRenderer = {
  image(href: string) {
    return <div className='img-container'><img src={href} style={{ width: "769px", maxHeight: "469px" }} /></div>;
  },
  paragraph(text: string) {
    return <p className='paragraph'>{text}</p>;
  },
  code(text: string) {
    return <code className='tag-code'>{text}</code>;
  },
};
