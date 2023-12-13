/*********************************************************************************
 * WEB422 – Assignment 3
 * 
 * Name: Yash Vaghani
 * Student ID: 158336214
 * Date: 12/9/23
 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 * No part of this assignment has been copied manually or electronically from any other source
 * (including web sites) or distributed to other students.
 *
 ********************************************************************************/

import useSWR from "swr";
import { useState, useEffect } from "react";
import { Accordion, Pagination } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import MovieDetails from "@/components/MovieDetails";

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);

  const { data, error } = useSWR(
    `https://plain-poncho-crab.cyclic.app/api/movies?page=${page}&perPage=10`
  );

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function next() {
    setPage(page + 1);
  }
  return (
    <>
      <PageHeader text="Film Collection : Sorted by Date"></PageHeader>
      <Accordion>
        {pageData.map((moVie) => (
          <Accordion.Item eventKey={moVie._id} key={moVie._id}>
            <Accordion.Header>
              <strong>{moVie.title}</strong>({moVie.year}: Directed By{" "}
              {moVie.directors.join(", ")})
            </Accordion.Header>
            <Accordion.Body>
              <MovieDetails movie={moVie} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
