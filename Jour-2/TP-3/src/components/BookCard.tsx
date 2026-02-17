interface BookProps {
title: string;
author: string;
}

const BookCard = (props: BookProps) => {
return (
<div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
<h3>{props.title}</h3>
<p>Par : {props.author}</p>
</div>
);
};
export default BookCard;