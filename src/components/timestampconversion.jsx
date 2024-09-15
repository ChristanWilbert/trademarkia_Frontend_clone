const UnixTimestampConverter = ({ unixTimestamp }) => {
  // Convert Unix timestamp to milliseconds
  const date = new Date(unixTimestamp * 1000);

  // Format the date as "26 Aug 1998"
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-GB", options);

  return <p className="m-0 inline">{formattedDate}</p>;
};
export default UnixTimestampConverter;
