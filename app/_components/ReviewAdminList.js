import ReviewAdminString from './ReviewAdminString';

export default function ReviewAdminList({ reviews }) {
	return (
		<div>
			{reviews?.map((review) => (
				<ReviewAdminString key={review.id} review={review} />
			))}
		</div>
	);
}
