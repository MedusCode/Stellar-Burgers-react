import React from 'react';
import styles from './orders-list.module.css';
import OrderCard from '../order-card/order-card';

const OrderList = ({ displayStatus }) => {
  const storage = {
    "success": true,
    "orders": [
      {
        "ingredients": [
          {
              "_id": "60d3b41abdacab0026a733c8",
              "name": "Филе Люминесцентного тетраодонтимформа",
              "type": "main",
              "price": 988,
              "image": "https://code.s3.yandex.net/react/code/meat-03.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733c9",
              "name": "Мясо бессмертных моллюсков Protostomia",
              "type": "main",
              "proteins": 433,
              "fat": 244,
              "carbohydrates": 33,
              "calories": 420,
              "price": 1337,
              "image": "https://code.s3.yandex.net/react/code/meat-02.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733ca",
              "name": "Говяжий метеорит (отбивная)",
              "type": "main",
              "proteins": 800,
              "fat": 800,
              "carbohydrates": 300,
              "calories": 2674,
              "price": 3000,
              "image": "https://code.s3.yandex.net/react/code/meat-04.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-04-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733cb",
              "name": "Биокотлета из марсианской Магнолии",
              "type": "main",
              "proteins": 420,
              "fat": 142,
              "carbohydrates": 242,
              "calories": 4242,
              "price": 424,
              "image": "https://code.s3.yandex.net/react/code/meat-01.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-01-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733d0",
              "name": "Хрустящие минеральные кольца",
              "type": "main",
              "proteins": 808,
              "fat": 689,
              "carbohydrates": 609,
              "calories": 986,
              "price": 300,
              "image": "https://code.s3.yandex.net/react/code/mineral_rings.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/mineral_rings-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733d1",
              "name": "Плоды Фалленианского дерева",
              "type": "main",
              "proteins": 20,
              "fat": 5,
              "carbohydrates": 55,
              "calories": 77,
              "price": 874,
              "image": "https://code.s3.yandex.net/react/code/sp_1.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/sp_1-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/sp_1-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733d2",
              "name": "Кристаллы марсианских альфа-сахаридов",
              "type": "main",
              "proteins": 234,
              "fat": 432,
              "carbohydrates": 111,
              "calories": 189,
              "price": 762,
              "image": "https://code.s3.yandex.net/react/code/core.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/core-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/core-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733d3",
              "name": "Мини-салат Экзо-Плантаго",
              "type": "main",
              "proteins": 1,
              "fat": 2,
              "carbohydrates": 3,
              "calories": 6,
              "price": 4400,
              "image": "https://code.s3.yandex.net/react/code/salad.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/salad-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/salad-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733d4",
              "name": "Сыр с астероидной плесенью",
              "type": "main",
              "proteins": 84,
              "fat": 48,
              "carbohydrates": 420,
              "calories": 3377,
              "price": 4142,
              "image": "https://code.s3.yandex.net/react/code/cheese.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/cheese-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/cheese-large.png",
              "__v": 0
          }
      ],
        "_id": "eew",
        "status": "done",
        "number": 1,
        "createdAt": "2022-06-16T20:11:01.403Z",
        "updatedAt": "2021-05-23T20:11:01.406Z",
        "price": 4000,
      },
      {
        "ingredients": [
          {
              "_id": "60d3b41abdacab0026a733c8",
              "name": "Филе Люминесцентного тетраодонтимформа",
              "type": "main",
              "proteins": 44,
              "fat": 26,
              "carbohydrates": 85,
              "calories": 643,
              "price": 988,
              "image": "https://code.s3.yandex.net/react/code/meat-03.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733c9",
              "name": "Мясо бессмертных моллюсков Protostomia",
              "type": "main",
              "proteins": 433,
              "fat": 244,
              "carbohydrates": 33,
              "calories": 420,
              "price": 1337,
              "image": "https://code.s3.yandex.net/react/code/meat-02.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
              "__v": 0
          }],
        "_id": "ee",
        "status": "done",
        "number": 3,
        "createdAt": "2022-06-23T20:13:23.654Z",
        "updatedAt": "2021-06-23T20:13:23.657Z",
        "price": 1111,
      },
      {
        "ingredients": [
          {
              "_id": "60d3b41abdacab0026a733c8",
              "name": "Филе Люминесцентного тетраодонтимформа",
              "type": "main",
              "proteins": 44,
              "fat": 26,
              "carbohydrates": 85,
              "calories": 643,
              "price": 988,
              "image": "https://code.s3.yandex.net/react/code/meat-03.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733c9",
              "name": "Мясо бессмертных моллюсков Protostomia",
              "type": "main",
              "proteins": 433,
              "fat": 244,
              "carbohydrates": 33,
              "calories": 420,
              "price": 1337,
              "image": "https://code.s3.yandex.net/react/code/meat-02.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
              "__v": 0
          }],
        "_id": "ee",
        "status": "done",
        "number": 3,
        "createdAt": "2022-06-23T20:13:23.654Z",
        "updatedAt": "2021-06-23T20:13:23.657Z",
        "price": 1111,
      },
      {
        "ingredients": [
          {
              "_id": "60d3b41abdacab0026a733c8",
              "name": "Филе Люминесцентного тетраодонтимформа",
              "type": "main",
              "proteins": 44,
              "fat": 26,
              "carbohydrates": 85,
              "calories": 643,
              "price": 988,
              "image": "https://code.s3.yandex.net/react/code/meat-03.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733c9",
              "name": "Мясо бессмертных моллюсков Protostomia",
              "type": "main",
              "proteins": 433,
              "fat": 244,
              "carbohydrates": 33,
              "calories": 420,
              "price": 1337,
              "image": "https://code.s3.yandex.net/react/code/meat-02.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
              "__v": 0
          }],
        "_id": "ee",
        "status": "done",
        "number": 3,
        "createdAt": "2022-06-23T20:13:23.654Z",
        "updatedAt": "2021-06-23T20:13:23.657Z",
        "price": 1111,
      },
      {
        "ingredients": [
          {
              "_id": "60d3b41abdacab0026a733c8",
              "name": "Филе Люминесцентного тетраодонтимформа",
              "type": "main",
              "proteins": 44,
              "fat": 26,
              "carbohydrates": 85,
              "calories": 643,
              "price": 988,
              "image": "https://code.s3.yandex.net/react/code/meat-03.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
              "__v": 0
          },
          {
              "_id": "60d3b41abdacab0026a733c9",
              "name": "Мясо бессмертных моллюсков Protostomia",
              "type": "main",
              "proteins": 433,
              "fat": 244,
              "carbohydrates": 33,
              "calories": 420,
              "price": 1337,
              "image": "https://code.s3.yandex.net/react/code/meat-02.png",
              "image_mobile": "https://code.s3.yandex.net/react/code/meat-02-mobile.png",
              "image_large": "https://code.s3.yandex.net/react/code/meat-02-large.png",
              "__v": 0
          }],
        "_id": "ee",
        "status": "done",
        "number": 3,
        "createdAt": "2022-06-23T20:13:23.654Z",
        "updatedAt": "2021-06-23T20:13:23.657Z",
        "price": 1111,
      },
    ],
    "total": 2,
    "totalToday": 2
  } 

  const orderListRef = React.useRef(null);

  React.useEffect(() => {
    const handleOrderListSizing = () => {
      orderListRef.current.style.maxHeight = `${window.innerHeight - orderListRef.current.offsetTop - 40}px`;
    }

    window.addEventListener('resize', handleOrderListSizing);
    handleOrderListSizing()

    return () => {
      window.removeEventListener('resize', handleOrderListSizing);
    }
  }, [])

  return (
    <ul className={`${styles.container} pr-4`} ref={orderListRef}>
      {storage.orders.map(order => <OrderCard order={order} displayStatus={displayStatus} key={order._id} />)}
    </ul>
  )
}

export default OrderList;