import { useState } from "react";
import Blur from "../components/Blur";
import { useDispatch } from "react-redux";
import { setIsJobSorted, setSorttedJob } from "../features/job/jobSlice";
import { useSelector } from "react-redux";

const Header = () => {
  const [active, setActive] = useState(0);
  const tags = useSelector((state) => state.job.tags);

  return (
    <header className=" flex pt-30 pb-10 flex-col space-y-10 montserrat-regular">
      <Blur />
      <span className="border-3  border-gray-800 text-gray-800 text-sm font-semibold me-2 px-6 py-2.5 rounded-full  w-fit select-none">
        We're hiring!
      </span>
      <div className="space-y-5">
        <h1 className="text-6xl montserrat-semiBold tracking-tighter">
          Be part of our mission
        </h1>
        <p
          className="font-semibold tracking-tight w-[60%]
         text-left"
        >
          We're looking for passionate people to join us on our mission. We
          value flat hierarchies, clear communication, and full ownership and
          reponsibility.
        </p>
      </div>
      <div className="overflow-x-auto whitespace-nowrap py-4 capitalize">
        {tags.map((item, index) => (
          <Capsule
            key={index}
            value={item}
            active={active}
            setActive={setActive}
          />
        ))}
      </div>
    </header>
  );
};

function Capsule({ value, active, setActive }) {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.job.tags);

  if (tags[active].toLowerCase() === value.toLowerCase()) {
    return (
      <span
        className={
          "bg-gray-800 border border-gray-800 text-white text-xs font-semibold me-2 px-4 py-1.5 rounded-full  w-fit cursor-pointer hover:bg-white hover:text-gray-800 transition-all duration-300 capitalize"
        }
      >
        {value
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")}
      </span>
    );
  }

  return (
    <span
      onClick={() => {
        setActive(tags.indexOf(value));
        if (value.toLowerCase() === "view all") {
          dispatch(setIsJobSorted(false));
        } else {
          dispatch(setSorttedJob(value.toLowerCase()));
          dispatch(setIsJobSorted(true));
        }
      }}
      className="border border-gray-800 text-gray-800 text-xs font-semibold me-2 px-4 py-1.5 rounded-full  w-fit cursor-pointer hover:bg-gray-800 hover:text-white transition-all duration-300 capitalize"
    >
      {value
    .split(" ")
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ")}
    </span>
  );
}

export default Header;
