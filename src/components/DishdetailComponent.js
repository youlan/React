import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    Row, Col, Label,Input } from 'reactstrap';
import {Link} from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import {Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';



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
        this.toggleModal()
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        //console.log(values)
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
                                <Label htmlFor="rating" md={12}>Rating</Label>
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
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                         />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
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
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
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
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            );
        else
            return(
                <div></div>
            );
        }
        
    function RenderComments({comments, postComment, dishId}) {
        if (comments != null){
            //console.log(comments)
            return (  
                <div>
                <h4>Comments</h4>
                <Stagger in>
                {comments.map(comment =>{
                    return (
                        <Fade in>          
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
                        </Fade> 
                           
                    )
                })
                }
                <CommentForm dishId={dishId} postComment={postComment} />
                </Stagger>
                </div>
            );} 
        else
            return(
                <div></div>
            );
        }

    const DishDetail = (props) => {
            if (props.isLoading){
                return(
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                )
            }
            else if (props.errMess) {
                return(
                    <div className="container">
                        <div className="row">
                            <h4>{props.errMess}</h4> 
                        </div>
                    </div>
                )
            }
            //console.log(props)
            else if (props.dish != null) 
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
                                < RenderDish dish={props.dish}
                                />
                            </div>
                            <div className="col-12 col-md-5 m-1">
                                <RenderComments comments={props.comments}
                                    postComment = {props.postComment}
                                    dishId = {props.dish.id} /> 
                            </div>

                        </div>
                    </div>
                )
        
    }

export default DishDetail;