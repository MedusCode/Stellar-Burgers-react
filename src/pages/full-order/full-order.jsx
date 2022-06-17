import React from 'react';
import styles from './full-order.module.css';
import { useParams } from 'react-router-dom';
import Order from '../../components/order/order.jsx'
import NotFound from '../not-found/not-found.jsx';

const FullOrder = () => {
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
        "_id": "62ac537dfa747e001bd52ea0",
        "status": "done",
        "number": 15453,
        "createdAt": "2022-06-16T20:11:01.403Z",
        "updatedAt": "2021-05-23T20:11:01.406Z",
        "price": 4000,
        'name': 'Death Star Starship Main бургер'
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
        'name': 'Death Star Starship Main бургер'
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
        'name': 'Death Star Starship Main бургер'
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
        'name': 'Death Star Starship Main бургер'
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
        'name': 'Death Star Starship Main бургер'
      },
    ],
    "total": 2,
    "totalToday": 2
  }

  const params = useParams();
  const [activeOrder, setActiveOrder] = React.useState(null);
  const [isOrderExist, setIsOrderExist] = React.useState(true);

  React.useEffect(() => {
    const order = storage.orders.find(order => order._id === params.id); 
    if (storage.orders.length > 0 && !order) setIsOrderExist(false)
    else {
    console.log(order)
      setActiveOrder(order);
    }
  }, []);

  if (!isOrderExist) return (
    <NotFound />
  )

  return (
    <div className={`${styles.container} pt-30`}>
      {activeOrder && 
        <>
          <h2 className={`${styles.title} text text_type_digits-default mb-5`}>{`#${activeOrder.number}`}</h2>
          <Order order={activeOrder} />
        </>
      }
    </div>
  )
}

export default FullOrder;