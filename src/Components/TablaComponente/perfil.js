import React from 'react';

const Perfil = ({ nombre, descripcion, avatar }) => (
    <div className="widget-content p-0">
        <div className="widget-content-wrapper">
            <div className="widget-content-left mr-3">
                <div className="widget-content-left">
                    <img width={40} className="rounded-circle"
                        src={avatar}
                        alt="" />
                </div>
            </div>
            <div className="widget-content-left flex2">
                <div className="widget-heading">
                    {nombre}
                </div>
                <div className="widget-subheading opacity-7">
                    {descripcion}
                </div>
            </div>
        </div>
    </div>
)

export default Perfil;