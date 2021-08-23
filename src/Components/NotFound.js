import React, { memo } from 'react';

function NotFound() {

  return (
    <>
        <div class="container NotFound">
            <div class="row justify-content-center">
                <div class="col-md-12 text-center">
                    <span class="display-1 d-block">404</span>
                    <div class="mb-4 lead">Data was not found</div>
                </div>
            </div>
        </div>
    </>
  );
}

export default memo(NotFound);
