import Link from "next/link";
import Card from "react-bootstrap/Card";
import MovieDetails from "../components/MovieDetails";
import PageHeader from "../components/PageHeader";

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://plain-poncho-crab.cyclic.app/api/movies/573a139af29313caabcf0859"
  );
  const data = await res.json();

  return { props: { movie: data } };
}

export default function About(props) {
  return (
    <>
      <PageHeader text="About the Developer: Riddhi B. Patel"></PageHeader>
      <Card>
        <Card.Body>
          <p>
            Currently in 5th semester of Computer Programming and Analysis at
            Seneca College
          </p>
          <p>
            My Favorite Movie is <Link href="movies/Dark City">Dark City</Link>
          </p>

          <MovieDetails movie={props.movie} />
        </Card.Body>
      </Card>
    </>
  );
}
