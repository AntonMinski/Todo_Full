class Pagination extends Component {


    // let LEFT_PAGE = 'LEFT';
    // let RIGHT_PAGE = 'RIGHT';

    /**
     * Helper method for creating a range of numbers
     * range(1, 5) => [1, 2, 3, 4, 5]
     */
    const range = (from, to, step = 1) => {
        let i = from;
        const range = [];

        while (i <= to) {
            range.push(i);
            i += step;
        }

        return range;
}
    // ...
  
    render() {
      if (!totalRecords || totalPages === 1) return null;
  
      const { currentPage } = state;
      const pages = fetchPageNumbers();
  
      return (
        <Fragment>
          <nav aria-label="Countries Pagination">
            <ul className="pagination">
              { pages.map((page, index) => {
  
                if (page === LEFT_PAGE) return (
                  <li key={index} className="page-item">
                    <a className="page-link" href="#" aria-label="Previous" onClick={handleMoveLeft}>
                      <span aria-hidden="true">&laquo;</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                );
  
                if (page === RIGHT_PAGE) return (
                  <li key={index} className="page-item">
                    <a className="page-link" href="#" aria-label="Next" onClick={handleMoveRight}>
                      <span aria-hidden="true">&raquo;</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                );
  
                return (
                  <li key={index} className={`page-item${ currentPage === page ? ' active' : ''}`}>
                    <a className="page-link" href="#" onClick={ this.handleClick(page) }>{ page }</a>
                  </li>
                );
  
              }) }
  
            </ul>
          </nav>
        </Fragment>
      );
    }
  }