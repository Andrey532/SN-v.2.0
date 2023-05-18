import React, {useState} from "react";
import styles from "./Paginator.module.css"
// @ts-ignore
import arrowRight from "../../../assets/images/arrowRight.svg"
// @ts-ignore
import arrowLeft from "../../../assets/images/arrowLeft.svg"


export type PaginatorType = {
  totalItemsCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  portionSize: number
}

export const Paginator: React.FC<PaginatorType> = ({
                                                     totalItemsCount,
                                                     pageSize,
                                                     onPageChanged,
                                                     currentPage,
                                                     portionSize = 10
                                                   }) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const portionCount = Math.ceil(pagesCount / portionSize)
  const [portionNumber, setPortionNumber] = useState(1)
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
  const rightPortionPageNumber = portionNumber * portionSize

  return <div className={styles.paginator}>
    {portionNumber > 0 &&
        <button onClick={() => {setPortionNumber(portionNumber - 1)}}><img className={styles.arrLeft} src={arrowLeft}/></button>}

          {pages
            .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
            .map((p) => {
              // return <span className={currentPage === p && styles.selectedPage}
              return <span className={ currentPage === p ? styles.selectedPage : styles.pageNumber}
                           key={p}
                           onClick={(e) => {
                             onPageChanged(p)
                           }}>{p} </span>
            })}
          {portionCount > portionNumber &&
              <button onClick={() => {setPortionNumber(portionNumber + 1)}}><img className={styles.arrRight} src={arrowRight}/></button>}
        </div>
    }