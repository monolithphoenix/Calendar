import React, { Component } from 'react';
import styles from "./calendar.module.css"

// Названия месяцев
const monthName=['Январь', 'Февраль',  'Март',  'Апрель', 'Май',  'Июнь',  'Июль',  'Август', 'Сентябрь',  'Октябрь',  'Ноябрь',  'Декабрь'];
 
// Названия дней недели
const dayName=['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

class Calendar extends Component {
  state = {
    currentDate: new Date(),
    shownMonth: this.currentDate,
    isModalShow: false
  }

  getCurrentDate = () => {

  }

  showModal = () => {
    this.setState({isModalShow: true})
  }
  hideModal = () => {
    this.setState({isModalShow: false})
  }



  render() {
    const {isModalShow} = this.state;
    console.log(this.state);
    
    return (
      <>

          <p>{monthName[this.state.currentDate.getMonth()]} {this.state.currentDate.getFullYear()}</p>
          <button className={styles.btn} onClick={this.showModal}>show Modal</button>
          <div className={`${styles.modal} ${isModalShow ? styles.modal__show : null}`}>
            <div className={styles.modal_dialog}>
              <button className={styles.btn} onClick= {this.hideModal}>Close modal</button>
            </div>
          </div>
      </>
    );
  }
}

export default Calendar;