import React, { Component } from 'react';
import styles from "./calendar.module.css"

// Названия месяцев
const monthName=['Январь', 'Февраль',  'Март',  'Апрель', 'Май',  'Июнь',  'Июль',  'Август', 'Сентябрь',  'Октябрь',  'Ноябрь',  'Декабрь'];
 
// Названия дней недели
const dayName=['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

// Текущая дата на момент инициализации
const currentDate = new Date();
console.log(currentDate);

// Текущий месяц на момент инициализации
const initialDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
console.log(initialDay);

// Функция для создания масива чисел месяца
function getArrayOfDaysInMonth(month, year) {
  let date = new Date(year, month, 1);
  const days = [[]];
  for (let i = 1; i < date.getDay(); i++) {
    days[days.length-1].push([])
  }
  while (date.getMonth() === month) {
    if (date.getDay() === 1) {
      days.push([])
    };
    days[days.length-1].push(new Date(date));
    date.setDate(date.getDate() + 1);

  }
  for (let i = date.getDay()-1; i <= 6 && i !==0 ; i++) {
    console.log(date.getDay());
    //i===1 && break;
    
    days[days.length-1].push([])
  }
  // console.log(days);
  
  return days;
}


class Calendar extends Component {
  state = {
    currentDate: currentDate,
    shownMonth: initialDay,
    isModalShow: false
  }

  componentDidUpdate = () => {
    console.log('componentDidUpdate');
    
  }

  showModal = (e) => {
    e.target.className === styles.cell && this.setState({isModalShow: true})
  }
  hideModal = () => {
    this.setState({isModalShow: false})
  }
  
  getCurrentDate = () => {
    this.setState({shownMonth: initialDay})
  }

  getPrevMonth = () => {
    const year = this.state.shownMonth.getFullYear();
    const month = this.state.shownMonth.getMonth();
    const prevMonth = new Date(Date.UTC(year, month-1));
    this.setState({shownMonth: prevMonth})
  }
  getNextMonth = () => {
    const year = this.state.shownMonth.getFullYear();
    const month = this.state.shownMonth.getMonth();
    const nextMonth = new Date(Date.UTC(year, month+1));
    this.setState({shownMonth: nextMonth})
  }

  renderCalendar = () => {
    const {shownMonth} = this.state;
    const days = getArrayOfDaysInMonth(shownMonth.getMonth(), shownMonth.getFullYear());
    console.log(days);

    let weekDay = shownMonth.getDay();
    console.log(weekDay); 
    

    return (
      <table className={styles.calendar} onClick={this.showModal}>
        <caption>{monthName[this.state.shownMonth.getMonth()]} {this.state.shownMonth.getFullYear()}</caption>  
        <tr>
          <th>{dayName[0]}</th>
          <th>{dayName[1]}</th>
          <th>{dayName[2]}</th>
          <th>{dayName[3]}</th>
          <th>{dayName[4]}</th>
          <th>{dayName[5]}</th>
          <th>{dayName[6]}</th>
        </tr>
          {days.map(element => <tr>{element.map(el => Array.isArray(el)
            ? <td></td>
            : <td className={styles.cell} data-date={`${el.getFullYear()}, ${el.getMonth()}, ${el.getDate()}`}>
                {el.getDate()}
              </td>
          )}
        </tr>)}
          
      </table>
    )
  }
  test = (e) => {
    console.log(new Date(e.target.dataset.date));
  }




  render() {
    const {currentDate, shownMonth, isModalShow} = this.state;
    console.log(this.state);
    
    
    return (
      <>
        <nav className={styles.navigation}>
          <button className={styles.btn} onClick={this.getPrevMonth}>Предыдущий месяц</button>
          <button className={styles.btn} onClick={this.getCurrentDate}>{monthName[currentDate.getMonth()]} {currentDate.getFullYear()}</button>
          <button className={styles.btn} onClick={this.getNextMonth}>Следующий месяц</button>
        </nav>
        
        {this.renderCalendar()}

        <button className={styles.btn} onClick={this.showModal}>show Modal</button>
        <div className={`${styles.modal}${isModalShow ? ' '+styles.modal__show+' '+styles.modal__opasity : ''}`}>
          <div className={styles.modal_dialog}>
            <button className={styles.btn} onClick= {this.hideModal}>Close modal</button>
          </div>
        </div>
      </>
    );
  }
}

export default Calendar;