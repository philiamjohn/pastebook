import React, {useState} from 'react';
import './Comment.css';
import CommentCard from '../comment-card/CommentCard';
import GrayStock from '../../images/gray.jpg';

const Comment = (props) => {

  const {postAuthorImg} = props;

  const [allCommentsShown, setAllCommentsShown] = useState(false); 
  
  const addComment = () => {
    document.getElementById('comment-box').focus();
  }

  const showMoreComments = () => {
    setAllCommentsShown(v => !v);
  }

  return (
    <div className='post-interactions-comments' id='comments'>
        <div className='post-interactions-comments-list'>
             <div className='post-interactions-comments-list-item'>
                <CommentCard commentAuthorImg={GrayStock} 
                             commentAuthor='Marites Bhie' 
                             commentText='SABIHAN MO'/>
             </div>
             {allCommentsShown ?
                                  null
                                : 
                                  <div className='post-interactions-comments-expand' onClick={showMoreComments}><p>View more comments</p></div>
             }
             
             {allCommentsShown ? 
                                  <div>
                                    <div className='post-interactions-comments-list-item'>
                                      <CommentCard postAuthorImg={GrayStock}
                                               commentAuthorImg={GrayStock} 
                                               commentAuthor='Marites Bhie' 
                                               commentText='SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!'
                                      />
                                    </div>
                                    <div className='post-interactions-comments-list-item'>
                                      <CommentCard commentAuthorImg={GrayStock} 
                                                 commentAuthor='Marites Bhie' 
                                                 commentText='SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!SABIHAN MO YUNG KABET MO WAG NIYA KAMING IDAMAY-DAMAY KUNG ANU-ANONG GINAGAWA NIYANG MGA ISTORYA PARA SA AMING PAMILYA DAHIL HINDI KAMI NAKIKIALAM SA BUHAY NIYONG MAG ASAWA KAHIT KAPATID MO KAHIT KAPATID KO YUNG ASAWA MO HINDI AKO KAMI NAKIKIALAM!'
                                      />
                                    </div>
                                  </div>   
                                : 
                                  null 
              }
        </div>
        <div className='post-interactions-comments-create'>
            <img src={postAuthorImg ? postAuthorImg  : GrayStock } alt="author-img" onClick={addComment}/>
            <input type='text' placeholder="Write a comment" id='comment-box'/>
        </div>
    </div>
  );
};

export default Comment;
