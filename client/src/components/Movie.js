import React, { useState, useEffect } from 'react';
import MovieDataService from '../services/movies';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export const Movie = (props) => {
  const [movie, setMovie] = useState({
    id: null,
    title: '',
    rated: '',
    reviews: [],
  });

  const getMovie = (id) => {
    MovieDataService.get(id)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getMovie(props.match.params.id);
  }, [props.match.params.id]);

  return (
    <>
      <div>
        <Container>
          <Row>
            <Col>
              <Image
                src={
                  movie.poster
                    ? movie.poster + '/100px250'
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP695k-2dJ-OutbGuuMxxUMlFH7038Dymmkw&usqp=CAU'
                }
                fluid
              />
            </Col>
            <Col>
              <Card>
                <Card.Header as="h5">{movie.title}</Card.Header>
                <Card.Body>
                  <Card.Text> {movie.plot} </Card.Text> ​​
                  {props.user && (
                    <Link to={'/movies/' + props.match.params.id + '/review'}>
                      Add Review
                    </Link>
                  )}
                </Card.Body>
              </Card>
              <h2>Reviews</h2>
              <br></br>
              {movie.reviews.map((review, index) => {
                return (
                  <Container as="div" key={index}>
                    <h5>{review.review}</h5>
                    <p>
                      {review.name + ' reviewed on '}
                      {moment(review.date).format('Do MMMMYYYY')}
                    </p>
                    {props.user && props.user.id === review.user_id && (
                      <Row>
                        <Col>
                          <Link
                            to={{
                              pathname:
                                '/movies/' + props.match.params.id + '/review',
                              state: { currentReview: review },
                            }}
                          >
                            Edit
                          </Link>
                        </Col>
                        <Col>
                          <Button variant="link">Delete</Button>
                        </Col>
                      </Row>
                    )}
                  </Container>
                );
              })}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
