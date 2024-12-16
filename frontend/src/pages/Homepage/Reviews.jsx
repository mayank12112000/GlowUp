import React, { useEffect } from "react";
import "./Reviews.css"; // Add the CSS file for styling
import Button from './../../components/Button';
import useQuery from "../../utils/useQuery";
import Skeleton from './../../components/Skeleton';

export default function Reviews() {
  const [loading,error,reviews,fetchReviews,success,message] = useQuery("/api/v1/reviews","GET",null)
    useEffect(()=>{
      fetchReviews()
    },[])
  return (
    <div className="reviews-container my-3">
      <h1 className="reviews-title">Reviews</h1>
      {/* Star Rating */}
      <div className="rating">
        <span className="stars">★★★★★</span>
        <span className="score">
          <strong>4.9</strong> <a href="#">(300)</a>
        </span>
      </div>

      {/* Reviews List */}
      <div className="reviews-list">
        {loading && <Skeleton number={2}/>}
        {!loading && reviews && reviews?.map((review) => (
          <div key={review.review_master_seq} className="review">
            <div className={`avatar highlighted`}>
              {review.name[0]}
            </div>
            <div className="review-content">
              <h5 className="reviewer-name">{review.name}</h5>
              <span className="review-date">{review.date?.substring(0,10)}</span>
              <div className="stars">{Array.from({length:review.rating}).map(()=> {return "★"})}</div>
              <p className="review-comment">
                {review.review}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* See All Button */}
      {reviews?.length>6 &&
        <div className="see-all-container">
        <Button text="See All"/>
      </div>
      }
    </div>
  );
}
