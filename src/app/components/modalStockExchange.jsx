import React, { useState } from "react";
import styles from "@/app/styles/modalApi.module.css";

const ModalStockExchange = ({ selectedCard, onClose }) => {
  return (
    <div>
      {selectedCard && (
        <div className={styles.modalApi}>
          <div className={styles.blockContentApi}>
            <span className={styles.closeModalApi} onClick={onClose}>
              Close X
            </span>
            <div className={styles.contentModalApi}>
              <h2>{selectedCard.name}</h2>
              <div className={styles.contentParagrapheApi}>
                <p>
                  {selectedCard.description}Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Praesent risus purus, vehicula
                  eget urna at, lacinia sodales nibh. Cras metus nunc, pulvinar
                  vel egestas eget, gravida ac lacus. Aliquam vulputate nunc
                  hendrerit auctor molestie. Nunc diam tellus, consequat a diam
                  at, finibus lacinia diam. Proin tempor id ante sit amet
                  fermentum. Sed vitae porttitor odio. Aliquam quis neque ac
                  ante aliquam rutrum et vitae tellus. Nulla iaculis est in
                  libero finibus, sed ullamcorper enim viverra. Fusce enim
                  lectus, scelerisque sit amet varius vestibulum, consequat
                  vitae nibh. Donec quis risus libero. Sed ullamcorper
                  scelerisque metus nec dignissim. Maecenas volutpat ullamcorper
                  enim, et eleifend quam vestibulum quis. Donec imperdiet enim
                  vel pulvinar mollis. Donec suscipit tortor sed eros porta, sit
                  amet dignissim mauris auctor. Duis sed ornare nibh.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalStockExchange;
