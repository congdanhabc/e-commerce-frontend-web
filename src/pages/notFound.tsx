import Notification from "../components/notification";

export default function NotFoundPage () {
    const title = '404 Not Found';
    const description = 'Trang không tồn tại';
    const buttonText = 'Trở về trang chủ';
    const buttonLink = '/'
    const type = 'error';
    return (
        <Notification title={title} description={description} buttonText={buttonText} buttonLink={buttonLink} type={type}></Notification>
    );
}