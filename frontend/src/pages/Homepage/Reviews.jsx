import React, { useEffect } from "react";
import "./Reviews.css"; // Add the CSS file for styling
import Button from './../../components/Button';
import useQuery from "../../utils/useQuery";

export default function Reviews() {
  const [loading,error,reviews,fetchReviews,success,message] = useQuery("/api/v1/reviews","GET",null)
    useEffect(()=>{
      fetchReviews()
    },[])
    console.log("reviews",reviews)
  // const reviews = [
  //   {
  //     id: 1,
  //     name: "Fadia",
  //     date: "Tue, 3 Dec, 2024 at 12:03 am",
  //     rating: 5,
  //     comment:
  //       "Many thanks to Feras 🙏 you did great job today, I am so happy every time",
  //     readMore: "Read more",
  //     initials: "F",
  //   },
  //   {
  //     id: 2,
  //     name: "Malachy D.",
  //     date: "Fri, 29 Nov, 2024 at 1:30 pm",
  //     rating: 5,
  //     comment: "Always great!!!",
  //     initials: "M",
  //   },
  //   {
  //     id: 3,
  //     name: "Rajaa A.",
  //     date: "Sat, 9 Nov, 2024 at 12:38 pm",
  //     rating: 5,
  //     comment: "Love it 🥰🥰 Romio amazing",
  //     initials: "R",
  //   },
  //   {
  //     id: 4,
  //     name: "Malachy D.",
  //     date: "Fri, 8 Nov, 2024 at 8:48 pm",
  //     rating: 5,
  //     comment: "Always great!! Never disappointed....",
  //     initials: "M",
  //   },
  //   {
  //     id: 5,
  //     name: "donna r.",
  //     date: "Sun, 3 Nov, 2024 at 11:45 pm",
  //     rating: 5,
  //     comment: "Very professional and customer-oriented service. Highly recommended!",
  //     initials: "d",
  //     isHighlighted: true,
  //   },
  //   {
  //     id: 6,
  //     name: "Chrysi",
  //     date: "Sat, 2 Nov, 2024 at 8:07 pm",
  //     rating: 5,
  //     comment:
  //       "Love this place! Fantastic hair salon. Fadi is amazing. All the staff very kind.",
  //     initials: "C",
  //   },
  // ];

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
        {reviews && reviews?.map((review) => (
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
