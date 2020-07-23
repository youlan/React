import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    Row, Col, Label,Input } from 'reactstrap';
import {Link} from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


class CommentForm extends Component {
     
    constructor(props) {
        super(props);
        this.state ={
            isModalOpen: false
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }


    render () {

        return (
        <div>
            <Button outline onClick={this.toggleModal}>
                <span className="fa fa-edit fg-lg">Submit Comment</span>
            </Button>

            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="username" md={12}>Rating</Label>
                                <Col md={12}>
                                <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".name" id="name" name="name"
                                        placeholder="Your Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="message" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".message" id="message" name="message"
                                        rows="6"
                                        className="form-control" 
                                        />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary" >Submit </Button>
                        </LocalForm>
                </ModalBody>
            </Modal>
        </div>
        )}
}


    function RenderDish({dish}) {
        if (dish != null)
            return(
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );
        else
            return(
                <div></div>
            );
        }
        
    function RenderComments({comments}) {
        if (comments != null){
            //console.log(comments)
            return (  
                <div>
                <h4>Comments</h4>
                {comments.map(comment =>{
                    return (                
                        <ul className="list-unstyled" key={comment.id}>
                            <li>{comment.comment}</li>
                            <li>
                            -- {comment.author} ,{" "}
                            {new Intl.DateTimeFormat("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric"
                            }).format(new Date(Date.parse(comment.date)))}
                            </li>
                        </ul>
                    )
                })
                }
                <CommentForm  />
                </div>
            );} 
        else
            return(
                <div></div>
            );
        }

    const DishDetail = (props) => {
            //console.log(props)
            return(   
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>                
                    </div>
                    <div className="row">
                        <div  className="col-12 col-md-5 m-1">
                            < RenderDish dish={props.dish}/>
                        </div>
                        <div className="col-12 col-md-5 m-1">
                            <RenderComments comments={props.comments}/> 
                        </div>

                    </div>
                </div>
            )
    }

export default DishDetail;