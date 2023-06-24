import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import '../../styles/CardsStyles.css';

function Home() {
  const [data, setdata] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/api/productsBd/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data.payload);
      });
  }, []);
  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:8080/api/cartsBd/cid/product/', {
        productId: productId,
      });
      console.log('Product added to cart successfully');
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  return (
    <div>
      {data.map((element) => (
        <Card className="card" key={element._id}>
          <Card.Img variant="top" src={element.thumbnail} />
          <Card.Body>
            <Card.Title>{element.title}</Card.Title>
            <Card.Text>{element.description}</Card.Text>
            <Card.Text>{element.price}</Card.Text>
            <Button variant="primary" onClick={() => addToCart(element._id)}>
              Agregar al carrito
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Home;
