import Homepage from "./homepage.mdx";
import "./globals.css";
const Home = () => {
  return (
    <div className="markdown p-3">
      <form action="https://send.pageclip.co/xx5I3Vjn4Ld5iqgFmvjDxAAuoSmNuzhG" className="pageclip-form" method="post">
        <input type="text" name="name" defaultValue="Roscoe Jones" />
        <input type="email" name="email" defaultValue="roscoe@example.com" />

        <button type="submit" className="pageclip-form__submit">
          <span>Send</span>
        </button>
      </form>
      <Homepage />

    </div>
  );
};

export default Home;