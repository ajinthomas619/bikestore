import React, { useState, useEffect, useContext } from 'react';
import { FirebaseContext } from '../../store/Context';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import Heart from '../../assets/Heart';

function Product() {
  const { firebase } = useContext(FirebaseContext);
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');

  const fetchProducts = async () => {
    const productsCollection = collection(firebase.firestore(), 'products');
    const snapshot = await getDocs(productsCollection);
    const productsData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(productsData);
  };

  const fetchReviews = async (productId) => {
    const reviewsCollection = collection(firebase.firestore(), 'reviews');
    const productReviewsQuery = query(reviewsCollection, where('productId', '==', productId));
    const snapshot = await getDocs(productReviewsQuery);
    const reviewData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setReviews(reviewData);
  };

  useEffect(() => {
    // Fetch products from Firebase
    fetchProducts();
  }, [firebase]);

  const handleReviewSubmit = async (e, productId) => {
    e.preventDefault();

    // Add new review to Firebase
    const reviewsCollection = collection(firebase.firestore(), 'reviews');
    const newReviewData = {
      text: newReview,
      createdAt: new Date(),
      productId: productId,
    };

    try {
      await addDoc(reviewsCollection, newReviewData);
      setNewReview('');
      // Refresh reviews after submission for the specific product
      fetchReviews(productId);
    } catch (error) {
      console.error('Error adding review: ', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      return 'Invalid Date';
    }
    const date = new Date(timestamp.seconds * 1000);
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
    // Convert Firebase Timestamp to JavaScript Date
    return date.toLocaleString(); // Format the Date as a string
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {products.map((product) => (
        <div key={product.id}>
          <h1>{product.productName}</h1>
          <div className="cards">
            <div className="card">
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.url} alt="" />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.model}</p>
              </div>
              <div className="date">
                <span>{formatTimestamp(product.createdAt)}</span>
              </div>
            </div>
          </div>

          <div key={product.id}>
            <h2>Customer Reviews</h2>

            {/* Review form */}
            <form onSubmit={(e) => handleReviewSubmit(e, product.id)}>
              <label htmlFor={`review-${product.id}`}>Write a review:</label>
              <textarea
                id={`review-${product.id}`}
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                required
              ></textarea>
              <button type="submit">Submit Review</button>
            </form>

            {/* Display reviews */}
            <div>
              {reviews.map((review) => (
                <div key={review.id}>
                  <p>{review.text}</p>
                  <p>Posted at: {formatTimestamp(review.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Product;
