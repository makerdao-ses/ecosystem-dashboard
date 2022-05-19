/* eslint-disable quotes */
import "./markdown.scss";
import React from "react";

export const customRenderer = {
  image(href: string) {
    return <div className='img-container'><img src={href} style={{ width: "769px", maxHeight: "469px" }} /></div>;
  },
  paragraph(text: string) {
    return <text className='paragraph'>{text}</text>;
  },
  code(text: string) {
    return <code className="tag-code">{text}</code>;
  },
};
