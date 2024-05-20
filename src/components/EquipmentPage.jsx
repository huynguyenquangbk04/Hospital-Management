import React, { useState } from 'react';

const EquipmentPage = () => {
    const [name, setName] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [expire, setExpire] = useState('');
    const [enter, setEnter] = useState(0);
    const [stock, setStock] = useState(0);
    const [used, setUsed] = useState(0);
    const [showAdditionalInput, setShowAdditionalInput] = useState(false);
    const [quantity, setQuantity] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newStock = stock + enter;
        setStock(newStock);
        setUsed(newStock);
        setShowAdditionalInput(true);
        setEnter(0);
    };

    const handleQuantitySubmit = (e) => {
        e.preventDefault();

        if (quantity <= stock) {
            const newStock = stock - quantity;
            setStock(newStock);
            setQuantity(0);
            setShowAdditionalInput(false);
        } else {
            alert('Số lượng muốn lấy vượt quá số lượng trong kho!');
        }
    };

    const styles = {
        body: {
            fontFamily: 'Arial, sans-serif',
            background: 'linear-gradient(90deg, rgba(9, 119, 121, 0.2190126050420168) 28%, rgba(2, 194, 229, 1) 100%, rgba(0, 212, 255, 0.7344187675070029) 100%)',
            margin: 0,
            padding: 0,
        },
        h2: {
            textAlign: 'center',
        },
        label: {
            display: 'block',
            marginBottom: '10px',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
        },
        submit: {
            backgroundColor: '#4caf50',
            color: '#fff',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        submitHover: {
            backgroundColor: '#45a049',
        },
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
    };

    return (
        <body style={styles.body}>
        <div style={styles.container}>
            <h2 style={styles.h2}>Trang thiết bị</h2>
            <form onSubmit={handleSubmit}>
                <label style={styles.label} htmlFor="Name">
                    Tên thiết bị:
                </label>
                <input
                    style={styles.input}
                    type="text"
                    id="Name"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label style={styles.label} htmlFor="date-in">
                    Ngày nhập:
                </label>
                <input
                    style={styles.input}
                    type="date"
                    id="date-in"
                    name="date-in"
                    value={dateIn}
                    onChange={(e) => setDateIn(e.target.value)}
                    required
                />
                <label style={styles.label} htmlFor="expire">
                    Ngày hết hạn:
                </label>
                <input
                    style={styles.input}
                    type="date"
                    id="expire"
                    name="expire"
                    value={expire}
                    onChange={(e) => setExpire(e.target.value)}
                    required
                />
                <label style={styles.label} htmlFor="enter">
                    Nhập thêm:
                </label>
                <input
                    style={styles.input}
                    type="number"
                    id="enter"
                    name="enter"
                    value={enter}
                    onChange={(e) => setEnter(parseInt(e.target.value))}
                    required
                />
                <input style={styles.submit} type="submit" value="Kiểm tra" />
            </form>
            <div>
                <p>
                    Số lượng có trong kho: <span id="stockOutput">{stock}</span>
                </p>
                <p>
                    Số lượng đã sử dụng: <span id="usedOutput">{used}</span>
                </p>
            </div>
            {showAdditionalInput && (
                <div>
                    <label style={styles.label} htmlFor="quantity">
                        Số lượng muốn lấy:
                    </label>
                    <input
                        style={styles.input}
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        required
                    />
                    <input style={styles.submit} type="submit" value="Xác nhận" onClick={handleQuantitySubmit} />
                </div>
            )}
        </div>
    </body>
    );
};

export default EquipmentPage;