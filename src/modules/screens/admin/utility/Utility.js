import React, { useEffect } from 'react';

import { AddUtility, UtilityItem } from '../../../components';
import { onAddUtility, onFetchUtilities, onUpdateUtility } from '../../../api/utility';

import styles from './Utility.module.css';
import { connect } from 'react-redux';
import { useCustomState } from './../../../helpers/hooks';

const Utility = props => {
  const [state, setState] = useCustomState({
    utilities: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    fetchUtilities();
    //eslint-disable-next-line
  }, [])

  const fetchUtilities = async () => {
    try {
      const result = await onFetchUtilities(props.auth.jwt);
      setState({
        loading: false,
        utilities: [...result]
      })
    } catch (error) {
      console.log(error)
      setState({
        loading: false,
        error: error.message
      })
    }
  }

  const addUtility = async values => {
    try {
      const result = await onAddUtility(values, props.auth.jwt);
      setState({
        utilities: [...result]
      })
    } catch (error) {
      const status = error.request.status
      if (status === 400) {
        alert("Utility already exist.")
      }
    }
  }

  const updateUtility = async values => {
    try {
      const result = await onUpdateUtility(values, props.auth.jwt);
      setState({
        utilities: [...result]
      })
    } catch (error) {
      console.log(error.message)
    }
  }

  const renderLoading = () => {
    return <div>loading...</div>
  }

  const renderError = () => {
    return <div>{state.error}</div>
  }

  const renderUtilities = () => {
    const utilities = state.utilities.map(util => {
      return <UtilityItem key={util.id} utility={util} handleUpdateUtility={updateUtility} />
    })
    return (
      <div className={styles.container}>
        <div className={styles.addUtility}>
          <AddUtility handleAddUtility={addUtility} />
        </div>
        <div className={styles.utilityItems}>
          {utilities}
        </div>
      </div>
    )
  }

  return state.loading ? renderLoading() : state.error ? renderError() : renderUtilities();
}

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  }
}

export default connect(mapStateToProps)(Utility);