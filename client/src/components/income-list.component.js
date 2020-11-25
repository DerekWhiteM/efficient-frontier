import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Income = props => (
  <tr>
    <td>{props.income.age1}</td>
    <td>{props.income.age2}</td>
    <td>{props.income.income}</td>
    <td>{props.income.savings}</td>
    <td>{props.income.tolerance}</td>
    <td>
      <Link to={"/income/edit/"+props.income._id}>edit</Link> | <a href="/#" onClick={() => { props.deleteIncome(props.income._id) }}>delete</a>
    </td>
  </tr>
)

export default class IncomeList extends Component {
  constructor(props) {
    super(props)

    this.deleteIncome = this.deleteIncome.bind(this)

    this.state = {incomes: []}
  }

  componentDidMount() {
    axios.get('http://localhost:5000/income/')
      .then(response => {
        this.setState({ incomes: response.data })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  deleteIncome(id) {
    axios.delete('http://localhost:5000/income/'+id)
      .then(response => { console.log(response.data)})

    this.setState({
      incomes: this.state.incomes.filter(el => el._id !== id)
    })
  }

  incomeList() {
    return this.state.incomes.map(currentincome => {
      return <Income income={currentincome} deleteIncome={this.deleteIncome} key={currentincome._id}/>
    })
  }

  render() {
    return (
      <div>
        <h3 style={{textAlign: 'center'}}>Income/Savings</h3>
        <div style={{ width: '15%', margin: 'auto' }}><Link to="/income/create">Create</Link></div>
        <table className="table">
          <thead>
            <tr>
              <th>Age1</th>
              <th>Age2</th>
              <th>Income</th>
              <th>Savings</th>
              <th>Tolerance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.incomeList() }
          </tbody>
        </table>
      </div>
    )
  }
}