const getOrderStatus = (status: string): string => {
  switch (status) {
    case 'done': return 'Выполнен'
    case 'pending': return 'Готовится'
    case 'created': return 'Создан'
    default: return 'Неизвестно'
  }
}

export default getOrderStatus;