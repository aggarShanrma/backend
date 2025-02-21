import { useEffect } from "react";

// state
import { useSelector, useDispatch } from "react-redux";
import { fetchHistory } from "../../states/UserStates/history_slice";

// ttypo
import { TypoDisable, TypoH1, TypoP, TypoSmall } from "../../components/ui/Typo";

// icons
import {
  HistoryIcon,
  HashIcon,
  ServerIcon,
  StarsIcon,
  Clock,
} from "lucide-react";

// date format 
import dateFormat, { masks } from "dateformat"

// TABLE ROW: ===>
const TableRow = () => {
  const table_row_data = [
    { title: "S.NO", icon: <HashIcon className="w-5"/> },
    { title: "APP", icon: <ServerIcon className="w-5"/> },
    { title: "points", icon: <StarsIcon className="w-5"/> },
    { title: "Date", icon: <Clock className="w-5"/> },
  ];
  return (
    <tr className="*:px-4 border-b border-slate-400">
      {table_row_data.map((heading, i) => (
        <th
          key={`${heading.title}${i}`}
          className="px-6"
        >
            <div className="flex gap-2 items-center flex-nowrap">
            {heading.icon}
            <TypoSmall>{heading.title}</TypoSmall>

            </div>
        </th>
      ))}
    </tr>
  );
};

// TABLE DATA ==========>
const TableData = ({ table_row_data, index }) => {
  // {
  //   "id": 3,
  //   "appID": 2,
  //   "appImg": "appImg/pic_raj.jpg",
  //   "appName": "app-1",
  //   "user_id": "temp",
  //   "date": "2025-02-18T13:29:27.875660Z",
  //   "points_earned": 5
  // }

    const date_app = new Date(table_row_data.date)
  return (<>
    <td>
        {index + 1}
    </td>
    <td>
        <div> 
            <div className="flex gap-2 items-center flex-nowrap">
             <div className="w-5 aspect-square rounded-full bg-slate-300 grid place-content-center">
                {
                    table_row_data.appImg ?
                        <img src={table_row_data.appImg}/>
                    : <p>{table_row_data.appName.charAt(0)}</p>
                }
            </div>   
            <TypoSmall>{table_row_data.appName}</TypoSmall>
            </div>
            
        </div>
    </td>
    <td className="font-semibold">
        {table_row_data.points_earned}
    </td>
    <td>
        {dateFormat(date_app, "dddd, mmmm dS, yyyy, h:MM TT")}
    </td>
  </>);
};

// HISTORY COMPONENTs
export default function History() {
  const history_state = useSelector((s) => s.history);
  const dispatch = useDispatch();

  useEffect(() => {
    if (history_state.data.length == 0) {
      alert("fetching history");
      dispatch(fetchHistory());
    }
  }, []);

  if (history_state.isLoad) {
    return <p>Loading...</p>;
  }
  if (history_state.isError) {
    return (
      <p className="text-red-700">
        {history_state.message || "failed to fetch history"}
      </p>
    );
  }

  //   console.log(history_state.data)
  return (
    <>
      <section>
        <div className="flex items-center gap-2">
          <HistoryIcon />
          <TypoH1>History</TypoH1>
        </div>

        <div className="max-w-[900px] mx-auto overflow-x-scroll my-8">
            {history_state.data.length ? (
            <table className="w-max">
                <thead>
                <TableRow />
                </thead>
                <tbody>
                {history_state.data.map((point_history, i) => (
                    <>
                    <tr
                        key={point_history.appName + i}
                        className={`*:px-4 *:py-2 ${i%2==0? "bg-slate-200": ""}`}
                    >
                        <TableData table_row_data={point_history} index={i} />
                    </tr>
                    </>
                ))}
                </tbody>
            </table>
            ) : (
            <TypoDisable>No Data</TypoDisable>
            )}
        </div>
      </section>
    </>
  );
}
