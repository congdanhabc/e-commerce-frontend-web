import Notification from "../components/shared/Notification";

export default function ThankyouPage () {
    const title = 'Đặt hàng thành công';
    const description = 'Cám ơn bạn đã mua hàng. Chúng tôi sẽ xử lý đơn hàng trong thời gian sớm nhất';
    const buttonText = 'Trở về trang chủ';
    const buttonLink = '/'
    const type = 'success';
    return (
        <div className="min-h-screen">
            <Notification title={title} description={description} buttonText={buttonText} buttonLink={buttonLink} type={type}></Notification>
        </div>
    );
}