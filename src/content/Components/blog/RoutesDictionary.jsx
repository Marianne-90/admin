import { Fragment } from "react";
import { AiFillCaretRight } from "react-icons/ai";

export const RoutesDictionary = ({ routes }) => {
  const routesArray = routes.split(" ");



  return (
    <p className="diccionarioRutas">
{
    routesArray.map((word, index) => (
        <Fragment key={index}>
          {word}
          {index !== routesArray.length - 1 && <AiFillCaretRight />}
        </Fragment>
      ))
}
    </p>
  );
};
