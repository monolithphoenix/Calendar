import React, { Component } from 'react';
import styles from "./calendar.module.css"


// Названия месяцев
const monthName=['Январь', 'Февраль',  'Март',  'Апрель', 'Май',  'Июнь',  'Июль',  'Август', 'Сентябрь',  'Октябрь',  'Ноябрь',  'Декабрь'];
 

// Названия дней недели
const dayName=['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];


// Текущая дата на момент инициализации
const currentDate = new Date();


// Текущий месяц на момент инициализации
const initialDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);


// Функция для создания матрицы чисел месяца
function getArrayOfDaysInMonth(month, year) {
  let date = new Date(year, month, 1);
  const days = [[]];
  const initialDay = date.getDay() === 0 ? 7 : date.getDay()

  for (let i = 1; i < initialDay; i++) {
    days[days.length-1].push([])
  }
  while (date.getMonth() === month) {
    if (date.getDay() === 1 && days[0].length) {
      days.push([])
    };
    days[days.length-1].push(new Date(date));
    date.setDate(date.getDate() + 1);

  }
  for (let i = date.getDay()-1; i <= 6 && i !==0 ; i++) {
    days[days.length-1].push([])
  }

  return days; // возвращаем матрицу чисел месяца
}


// Модуль календаря >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

class Calendar extends Component {
  state = {
    currentDate: currentDate,
    shownMonth: initialDate,
    isModalShow: false,
    notes: [ {date: "2019,6,1", note: "saved note"} ],
    modalData: {
      date: "",
      note: ""
    }
  }

  // Действие по клику на таблицу
  showModal = (e) => {
    if (e.target.className.includes(styles.cell)) { // проверяем есть ли в этом элементе классом "cell"
      const cellDate = e.target.dataset.date; // извлекаем значение data-date
      const hasNote = this.state.notes.find(el => el.date === cellDate); // проверяем имеется ли запись на эту дату
      this.setState({
        isModalShow: true, // показываем модальное окно
        modalData: {
          date: cellDate, 
          note:(hasNote && hasNote.note) || ""
        } // записываем в state данные о оперируемой ячейки
      })
    }
  }

  // Закрывааем модальное окно
  hideModal = () => {
    this.setState({isModalShow: false})
  }
  
  // Возвращаемся на текущий месяц
  getCurrentDate = () => {
    this.setState({shownMonth: initialDate})
  }

  // Перелистываем календарь на предыдущий месяц
  getPrevMonth = () => {
    const year = this.state.shownMonth.getFullYear();
    const month = this.state.shownMonth.getMonth();
    const prevMonth = new Date(Date.UTC(year, month-1));
    this.setState({shownMonth: prevMonth})
  }

  // Перелистываем календарь на следующий месяц
  getNextMonth = () => {
    const year = this.state.shownMonth.getFullYear();
    const month = this.state.shownMonth.getMonth();
    const nextMonth = new Date(Date.UTC(year, month+1));
    this.setState({shownMonth: nextMonth})
  }

  // Принимаем введённые данные из инпута
  getInputValue = (e) => {
    this.setState({
      modalData: {
        ...this.state.modalData,
        note: e.target.value
      }
    })
  }

  // Метод для отрисовки каледаря
  renderCalendar = () => {
    const {shownMonth, notes} = this.state;
    const days = getArrayOfDaysInMonth(shownMonth.getMonth(), shownMonth.getFullYear());

    return (
      <table className={styles.calendar} onClick={this.showModal}>
        <caption>{monthName[this.state.shownMonth.getMonth()]} {this.state.shownMonth.getFullYear()}</caption> 
        <tbody> 
        <tr>
          {dayName.map(el => <th key={el}>{el}</th>)}
        </tr>
          { 
            days.map((element, i) => <tr key={i}>{element.map((el, j) => Array.isArray(el)
              ? <td key={i.toString()+j}></td>
              : <td className={notes.find(obj => obj.date === `${el.getFullYear()},${el.getMonth()},${el.getDate()}`) ? `${styles.cell} ${styles.cell__hasNote}`: styles.cell} data-date={`${el.getFullYear()},${el.getMonth()},${el.getDate()}`} key={el}>
                  {el.getDate()}
                </td>
              )}
            </tr>)
          }
        </tbody> 
      </table>
    )
  }

  // Действие инициируется при отправке формы(клик на кнопку "Сохранить")
  saveNotes = (e) => {
    e.preventDefault(); // предотвращаем перезагрузку страницы
    const {modalData, notes} = this.state
    switch (modalData.note) {
      case "": // если после редактирования в инпут пусто - удалим запись на текущий дени из массива записей
        this.setState({
          notes: notes.filter(el => el.date !== modalData.date),
          modalData: {},
          isModalShow: false,
        });
        break;
      default: // удаляем предыдущую запись на редактируемую дату(если она существовала) и добавляем обновлённую запись
        this.setState({
          notes: [
            ...notes.filter(el => el.date !== modalData.date),
            modalData
          ],
          modalData: {},
          isModalShow: false,
        });
        break;
    }
  }


  render() {
    const {currentDate, isModalShow, modalData} = this.state;
    
    return (
      <>
        <nav className={styles.navigation}>
          <button className={styles.btn} onClick={this.getPrevMonth}>Предыдущий месяц</button>
          <button className={styles.btn} onClick={this.getCurrentDate}>{monthName[currentDate.getMonth()]} {currentDate.getFullYear()}</button>
          <button className={styles.btn} onClick={this.getNextMonth}>Следующий месяц</button>
        </nav>
        
        {this.renderCalendar()}

        {isModalShow && 
          <div className={styles.modal}>
            <form className={styles.modal_dialog} onSubmit={this.saveNotes}>
              <textarea className={styles.text_area} 
                placeholder="Здесь можно оставить заметку к этому дню"
                onChange={this.getInputValue}
                value={modalData.note}
                autoFocus={true}>
              </textarea>
              <button className={styles.btn} type="button" onClick={this.hideModal}>Отмена</button>
              <button className={styles.btn} type="submit">Сохранить</button>
            </form>
          </div>
        }
      </>
    );
  }
}

export default Calendar;