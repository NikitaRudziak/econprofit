import React, { useEffect, useState }from 'react';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


export const PageMapContainer = () => {}

const mapStateToProps = state => ({
  page: state.pageReducer.page,
  region: state.pageReducer.region,
});
  
const mapDispatchToProps = {
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PageMapContainer));