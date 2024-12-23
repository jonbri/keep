import moment from "moment";
import { Item } from "./types";
import "./App.scss";

const now = new Date();
const nowMonth = now.getMonth() + 1;
const nowDate = now.getDate();

export interface AppProps {
  dates: Item[];
  upcoming: string;
}
const App = ({ dates, upcoming }: AppProps) => {
  return (
    <div>
      <h3>
        <a href="./">{moment().format("MMMM D, YYYY")}</a>
      </h3>
      <h4 className="soon">{upcoming}</h4>
      <table>
        <tbody>
          {dates.map(({ name, death, hide, formattedAge, birthday, daysUntilBirthday }) => {
            let rowColor = "";
            if (death) rowColor = "passedAway";
            else if (hide) rowColor = "hide";
            const [, month, date] = birthday.split("-");
            return !death && nowMonth === parseInt(month) && nowDate === parseInt(date) ? (
              <tr className={rowColor ? `${rowColor} today` : "today"} key={name}>
                <td colSpan={2}>{`${formattedAge.replace(/[^\d]+/, "")} ${name.toUpperCase()}`}</td>
                <td
                  style={{
                    fontSize: "16px",
                  }}
                >
                  {birthday}
                </td>
                <td></td>
              </tr>
            ) : (
              <tr className={rowColor} key={name}>
                <td>{name}</td>
                <td colSpan={death ? 3 : 1}>
                  {death
                    ? `${formattedAge.replace(/([\d]+).*$/, "$1")} (${birthday} - ${death})`
                    : formattedAge.replace(" months", "mo").replace(" years", "y")}
                </td>
                {death ? null : <td>{birthday}</td>}
                {death ? null : <td>{`(-${daysUntilBirthday})`}</td>}
              </tr>
            );
          })}
        </tbody>
      </table>

      <br />
      <div id="office">
        <h4>Office</h4>
        <table>
          <thead>
            <tr>
              <th>Month</th>
              <th>Attendance</th>
              <th>Avg</th>
              <th>Days</th>
            </tr>
          </thead>
          <tbody>
            {office.map(([date, present, total]) => (
              <tr>
                <td>{date}</td>
                <td>{`${present} / ${total}`}</td>
                <td>{`${((present / total) * 100).toFixed(1)}%`}</td>
                <td>{((5 * ((present / total) * 100)) / 100).toFixed(1)}</td>
              </tr>
            ))}
            <tr className="totals">
              <td>Total</td>
              <td>{`${totalInOffice} / ${totalOffice}`}</td>
              <td>{inOfficePercentage}</td>
              <td>{averageDaysPerWeekInOffice}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

type OfficeMonth = [string, number, number];
const office: OfficeMonth[] = [
  ["Oct 2024", 10, 23],
  ["Nov 2024", 10, 19],
  ["Dec 2024", 10, 15],
];
const totalInOffice = office.reduce((acc, [, present]) => acc + present, 0);
const totalOffice = office.reduce((acc, [, , total]) => acc + total, 0);
const inOfficePercentageValue = (totalInOffice / totalOffice) * 100;
const inOfficePercentage = `${inOfficePercentageValue.toFixed(1)}%`;
const averageDaysPerWeekInOffice = ((5 * inOfficePercentageValue) / 100).toFixed(1);

export default App;
