'use strict'

function getStartedButton() {
	$('#get-started').click(event =>{
		event.preventDefault();
	 $('#search-page').html(searchPage());
	})
}

$(getStartedButton)

function searchPage () {
	return `<label id="labels" for="js-query"><b>Food Item Here:</b></label>
            <input type="text" id="js-query" class="controls" name="search" aria-label="search-here" placeholder="enter food here">
              <button id="search-button" type="submit">Search</button>
              <span id="error"></span>`;
}